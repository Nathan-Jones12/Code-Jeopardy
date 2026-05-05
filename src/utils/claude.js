const PROXY_URL = import.meta.env.VITE_CLAUDE_PROXY_URL;

export class ClaudeUnavailableError extends Error {}

function ensureProxy() {
  if (!PROXY_URL) throw new ClaudeUnavailableError('VITE_CLAUDE_PROXY_URL missing');
}

async function callClaude(prompt, { timeoutMs = 30000, maxRetries = 3 } = {}) {
  ensureProxy();

  let lastErr;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, temperature: 0.8 }),
        signal: controller.signal
      });
      if (res.ok) return await res.json();

      // Retry on transient overload/rate-limit; fail fast on everything else.
      if (res.status !== 503 && res.status !== 429 && res.status !== 529) {
        throw new ClaudeUnavailableError(`Claude HTTP ${res.status}`);
      }
      lastErr = new ClaudeUnavailableError(`Claude HTTP ${res.status}`);
    } catch (err) {
      if (err instanceof ClaudeUnavailableError && !String(err.message).match(/HTTP (503|429|529)/)) {
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
  throw lastErr || new ClaudeUnavailableError('Claude failed after retries');
}

function stripFences(s) {
  // Claude usually returns clean JSON, but defensively peel ```json ... ``` fences.
  const m = s.match(/^\s*```(?:json)?\s*([\s\S]*?)\s*```\s*$/i);
  return m ? m[1] : s;
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

  const prompt = `You are preparing content for a Jeopardy-style vocabulary game for full-stack web bootcamp students. Respond with STRICT JSON only — no prose, no code fences.

Audience: full-stack web bootcamp students. They know HTML, CSS, and JavaScript basics and are learning frameworks (React/Vue/Express), databases, REST APIs, auth, testing, Git, and deployment. They do NOT know OS internals, compiler theory, kernel mechanics, or algorithm-complexity proofs. Frame every clue in terms of practical web-dev situations — a request, a component, a deploy, a table, a bug. Use real-world tools they'd encounter (npm, GitHub, Postman, VS Code, browser DevTools, Vercel/AWS) when natural. Don't dumb the clues down — these are college-age learners — but skip jargon that only a CS major or systems engineer would recognize.

Produce TWO things:

1) category_labels: For each raw category below, invent a short Jeopardy-style title (PUNNY, PLAYFUL, ALL CAPS, <= 5 words) that clearly hints at the theme. Examples of the style: "IT'S ALL OBJECT-ORIENTED", "BYTE-SIZED BASICS", "LOOPY LOGIC", "DATA-BASE JUMPERS". Keep it recognizable.

Raw categories:
${catList || '  (none)'}

2) clues: For each term below, produce:
   - "definition": ONE crisp textbook-style sentence that names at least one distinctive identifying detail — a signature keyword, syntax form, library, file/config name, observable behavior, or characteristic use case — so the answer is unambiguous even without the term being mentioned.
   - "scenario": ONE sentence describing a concrete coding situation that uniquely identifies this term. Name a signature keyword, syntax, library, command, error, or mechanism so NO OTHER web-dev concept could plausibly fit.
   - "acceptable_answers": array of strings. Include the canonical term plus every reasonable synonym, abbreviation, and alternate phrasing a player might type (e.g. "PR" and "pull request", "env var" and "environment variable", "auth" and "authentication"). Aim for 3–7 entries. Do not include wrong/related concepts.

CRITICAL — the no-leak rule (this is the single most important constraint):
   - The definition AND the scenario must NEVER contain the canonical term, any of its words taken individually, or any inflection/variant of those words. This applies to BOTH fields.
   - "Inflection or variant" means: plural, singular, possessive, gerund (-ing), past tense, adjective form, abbreviation, expanded acronym, hyphenated split, and any rearrangement.
   - Example — if the term is "Pull Request": you may NOT write "pull", "pulls", "pulling", "request", "requests", "requesting", "PR", or "pull request" anywhere in either field. Refer to it indirectly: "a GitHub proposal to merge changes…".
   - Example — if the term is "Closure": you may NOT write "close", "closes", "closing", "closed", or "closure". Use indirect phrasing: "a function that retains access to its outer scope after that scope returns".
   - Example — if the term is "JWT": you may NOT write "JWT", "JSON Web Token", "JSON", "Web", or "Token" individually. Refer indirectly: "a signed, base64-encoded string carrying user claims".
   - Before emitting each clue, mentally re-read it WITHOUT knowing the answer. If a player familiar with the topic could read it and not be sure which specific concept it refers to, add a more distinctive identifying detail (a specific syntax, library name, file name, error code, or observable side-effect). If the clue accidentally contains the term or one of its words, rewrite it.

Length: each field under 30 words.

Terms:
${termList || '  (none)'}

Respond with exactly this JSON shape:
{
  "category_labels": { "<raw_category>": "<JEOPARDY TITLE>", ... },
  "clues": [
    { "id": <number>, "definition": "...", "scenario": "...", "acceptable_answers": ["...", "..."] }
  ]
}`;

  const resp = await callClaude(prompt, { timeoutMs: 30000 });

  const text = stripFences(String(resp?.text || '')).trim();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ClaudeUnavailableError('Failed to parse Claude JSON');
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

export function claudeEnabled() {
  return !!PROXY_URL;
}
