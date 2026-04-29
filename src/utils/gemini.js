const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export class GeminiUnavailableError extends Error {}

function ensureKey() {
  if (!API_KEY) throw new GeminiUnavailableError('VITE_GEMINI_API_KEY missing');
}

async function callGemini(body, { timeoutMs = 30000, maxRetries = 3 } = {}) {
  ensureKey();

  let lastErr;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(`${BASE}?key=${encodeURIComponent(API_KEY)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      if (res.ok) return await res.json();

      // Retry on transient overload/rate-limit; fail fast on everything else.
      if (res.status !== 503 && res.status !== 429) {
        throw new GeminiUnavailableError(`Gemini HTTP ${res.status}`);
      }
      lastErr = new GeminiUnavailableError(`Gemini HTTP ${res.status}`);
    } catch (err) {
      if (err instanceof GeminiUnavailableError && !String(err.message).match(/HTTP (503|429)/)) {
        throw err;
      }
      lastErr = err;
    } finally {
      clearTimeout(t);
    }

    if (attempt < maxRetries) {
      const backoff = 1000 * 2 ** attempt + Math.random() * 250;
      await new Promise(r => setTimeout(r, backoff));
    }
  }
  throw lastErr || new GeminiUnavailableError('Gemini failed after retries');
}

function extractText(resp) {
  return resp?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
}

/**
 * One-shot call that produces every piece of content a round needs.
 *
 * Inputs:
 *   clueTerms: array of { id, term, category } that need clue text generated.
 *     (May be empty if everything is already cached.)
 *   categories: array of raw category names that need a Jeopardy-style label.
 *
 * Returns:
 *   {
 *     categories: { [rawCategory]: "JEOPARDY-STYLE TITLE", ... },
 *     clues: { [id]: { definition, scenario, acceptableAnswers: [...] } }
 *   }
 */
export async function generateGameContent({ clueTerms, categories }) {
  if (!clueTerms.length && !categories.length) {
    return { categories: {}, clues: {} };
  }

  const termList = clueTerms
    .map(t => `  - id=${t.id} | term="${t.term}" | raw_category="${t.category}"`)
    .join('\n');
  const catList = categories.map(c => `  - "${c}"`).join('\n');

  const prompt = `You are preparing content for a Jeopardy-style Computer Science vocabulary game. Respond with STRICT JSON only — no prose, no code fences.

Produce TWO things:

1) category_labels: For each raw category below, invent a short Jeopardy-style title (PUNNY, PLAYFUL, ALL CAPS, <= 5 words) that clearly hints at the theme. Examples of the style: "IT'S ALL OBJECT-ORIENTED", "BYTE-SIZED BASICS", "LOOPY LOGIC", "DATA-BASE JUMPERS". Keep it recognizable.

Raw categories:
${catList || '  (none)'}

2) clues: For each term below, produce:
   - "definition": ONE crisp textbook-style sentence.
   - "scenario": ONE sentence describing a concrete coding situation that uniquely identifies this term. Name a signature keyword, syntax, or mechanism so NO OTHER CS concept could plausibly fit.
   - "acceptable_answers": array of strings. Include the canonical term plus every reasonable synonym, abbreviation, and alternate phrasing a player might type (e.g. "OOP" and "object-oriented programming", "FP" and "functional programming", "recursion" and "recursive function"). Aim for 3–7 entries. Do not include wrong/related concepts.

Rules for definition and scenario:
   - Do not use the canonical term itself (or a trivial inflection) inside the definition or scenario text.
   - Under 30 words each.

Terms:
${termList || '  (none)'}

Respond with exactly this JSON shape:
{
  "category_labels": { "<raw_category>": "<JEOPARDY TITLE>", ... },
  "clues": [
    { "id": <number>, "definition": "...", "scenario": "...", "acceptable_answers": ["...", "..."] }
  ]
}`;

  const resp = await callGemini({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.8
    }
  }, { timeoutMs: 30000 });

  const text = extractText(resp).trim();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new GeminiUnavailableError('Failed to parse Gemini JSON');
  }

  const catLabels = {};
  if (parsed.category_labels && typeof parsed.category_labels === 'object') {
    for (const [k, v] of Object.entries(parsed.category_labels)) {
      if (v) catLabels[k] = String(v).trim();
    }
  }

  const clues = {};
  if (Array.isArray(parsed.clues)) {
    for (const row of parsed.clues) {
      if (!row || row.id == null) continue;
      const answers = Array.isArray(row.acceptable_answers)
        ? row.acceptable_answers.map(s => String(s).trim()).filter(Boolean)
        : [];
      if (row.definition && row.scenario) {
        clues[row.id] = {
          definition: String(row.definition).trim(),
          scenario: String(row.scenario).trim(),
          acceptableAnswers: answers
        };
      }
    }
  }

  return { categories: catLabels, clues };
}

export function geminiEnabled() {
  return !!API_KEY;
}
