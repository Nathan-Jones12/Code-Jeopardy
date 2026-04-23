const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export class GeminiUnavailableError extends Error {}

function ensureKey() {
  if (!API_KEY) throw new GeminiUnavailableError('VITE_GEMINI_API_KEY missing');
}

async function callGemini(body, { timeoutMs = 8000 } = {}) {
  ensureKey();
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}?key=${encodeURIComponent(API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (!res.ok) throw new GeminiUnavailableError(`Gemini HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

function extractText(resp) {
  return resp?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
}

/**
 * Generate a batch of clues. Input: array of { id, term, category }.
 * Returns: map of id -> { definition, scenario }.
 */
export async function generateCluesBatch(items) {
  if (!items.length) return {};
  const list = items
    .map(t => `- id=${t.id} | term="${t.term}" | category="${t.category}"`)
    .join('\n');

  const prompt = `You are writing Jeopardy-style clues for a Computer Science vocabulary game.

For each term below, produce:
- "definition": ONE crisp textbook-style sentence defining it.
- "scenario": ONE sentence describing a concrete coding situation. It MUST uniquely identify this term — no other CS concept should plausibly fit. Name a signature keyword, syntax, or mechanism.

Rules:
- Never use the term itself (or an obvious inflection) in either field.
- Keep each under 30 words.

Terms:
${list}

Respond with STRICT JSON: an array of objects { "id": <number>, "definition": "...", "scenario": "..." }. No prose, no code fences.`;

  const resp = await callGemini({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7
    }
  }, { timeoutMs: 20000 });

  const text = extractText(resp).trim();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new GeminiUnavailableError('Failed to parse Gemini JSON');
  }
  if (!Array.isArray(parsed)) throw new GeminiUnavailableError('Expected array');

  const out = {};
  for (const row of parsed) {
    if (row && row.id != null && row.definition && row.scenario) {
      out[row.id] = {
        definition: String(row.definition).trim(),
        scenario: String(row.scenario).trim()
      };
    }
  }
  return out;
}

/**
 * Judge whether a submitted answer is acceptable given the clue+canonical term.
 * Returns true/false. Throws GeminiUnavailableError on failure/timeout — caller
 * should treat that as "wrong" (fall back to local result).
 */
export async function judgeAnswer({ submitted, term, clueText }) {
  const prompt = `You are adjudicating a Jeopardy-style game answer.

Clue: "${clueText}"
Canonical answer: "${term}"
Player answered: "${submitted}"

Is the player's answer an acceptable synonym or alternate phrasing for the canonical answer, in the context of the clue? Accept close synonyms, common abbreviations, and reasonable alternate terminology. Reject unrelated or wrong concepts.

Reply with exactly one word: YES or NO.`;

  const resp = await callGemini({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.0, maxOutputTokens: 5 }
  }, { timeoutMs: 2500 });

  const text = extractText(resp).trim().toUpperCase();
  return text.startsWith('YES');
}

export function geminiEnabled() {
  return !!API_KEY;
}
