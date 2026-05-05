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
 *     clues: { [id]: { clue, acceptableAnswers: [...] } }
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

1) category_labels: For each raw category below, invent a short title in the style of REAL Jeopardy categories — PUNNY, PLAYFUL, ALL CAPS, ≤ 5 words — that hints at the theme through wordplay or a clever angle, NOT just a louder version of the topic name.

   Good examples (do this kind of thing):
   - Git → "GIT 'ER DONE", "BRANCH MANAGERS", "COMMIT-MENT ISSUES"
   - HTTP/Networking → "GET OFF MY LAWN", "STATUS UPDATES", "HEADER NEWS"
   - Backend/APIs → "REST FOR THE WEARY", "ROUTE 66", "ENDPOINT BLANK"
   - Databases → "TABLE FOR ONE", "JOIN THE CLUB", "PRIMARY CONCERNS"
   - Auth/Security → "ACCESS DENIED", "TOKEN OF APPRECIATION", "PASS-THE-WORD"
   - Frontend → "STATE OF THE ART", "PROPS TO YOU", "HOOK, LINE & SINKER"
   - DevOps → "SHIP HAPPENS", "DEPLOY OR DIE", "PIPELINE DREAMS"

   Bad examples (do NOT do this):
   - "DATABASES 101" (too literal)
   - "ALL ABOUT GIT" (no wordplay)
   - "JAVASCRIPT STUFF" (lazy)
   - "HTML AND CSS" (just the topic)
   - "GIT IN 2005" or "WEB 2.0 ERA" (NEVER use specific dates, years, version numbers, or "the era of X" — coding terms are timeless and dates aren't useful)

   Each label should be guessable from its theme but feel like it could appear on the actual Jeopardy show.

Raw categories:
${catList || '  (none)'}

2) clues: For each term below, produce ONE "clue" — a single sentence that points unambiguously at the answer. Like real Jeopardy, VARY the style across the 5 clues that share a category so the column doesn't feel monotonous. Pick whichever style fits each term best from this menu:

   a) Workflow moment — "You push to main and watch GitHub Actions run your tests and deploy to Vercel automatically." (best for tools, workflows)
   b) Direct description — "An open standard for delegated authorization that lets users grant apps access to their data on another service." (best for abstract concepts)
   c) Developer-quote / overheard — "After login the server sets a 'Bearer ___' header that the client attaches to every subsequent request." (best for protocols, headers, tokens)
   d) First-person riddle — "I'm the small text file the browser sends back automatically with every request to the domain that set me." (best for things with personality)
   e) Symptom / debugging moment — "Your styles aren't applying because an earlier rule with an ID selector outranks your class selector for the same element." (best for browser/CSS quirks)
   f) Wordplay tease — "If a function had a memory, it would remember the variables in the scope where it was born." (best for evocative, metaphor-friendly terms)
   g) Command-line snippet — "You run this in the terminal with a name argument and Git creates a new line of work pointing at the same commit as main." (best for commands)

   Aim for roughly even spread of styles within each category. Don't use the same style for all 5 clues in a column.

   - "acceptable_answers": array of strings. Include the canonical term plus every reasonable synonym, abbreviation, and alternate phrasing a player might type (e.g. "PR" and "pull request", "env var" and "environment variable", "auth" and "authentication"). Aim for 3–7 entries. Do not include wrong/related concepts.

CRITICAL — the no-leak rule (this is the single most important constraint):
   - The clue must NEVER contain the canonical term, any of its words taken individually, or any inflection/variant of those words.
   - "Inflection or variant" means: plural, singular, possessive, gerund (-ing), past tense, adjective form, abbreviation, expanded acronym, hyphenated split, and any rearrangement.
   - Example — if the term is "Pull Request": you may NOT write "pull", "pulls", "pulling", "request", "requests", "requesting", "PR", or "pull request" in the clue. Refer to it indirectly: "a GitHub proposal to merge changes…".
   - Example — if the term is "Closure": you may NOT write "close", "closes", "closing", "closed", or "closure". Use indirect phrasing: "a function that retains access to its outer scope after that scope returns".
   - Example — if the term is "JWT": you may NOT write "JWT", "JSON Web Token", "JSON", "Web", or "Token" individually. Refer indirectly: "a signed, base64-encoded string carrying user claims".
   - Before emitting each clue, mentally re-read it WITHOUT knowing the answer. If a player familiar with the topic could read it and not be sure which specific concept it refers to, add a more distinctive identifying detail (a specific syntax, library name, file name, error code, or observable side-effect). If the clue accidentally contains the term or one of its words, rewrite it from a different angle rather than producing awkward wording.

Length: clue under 35 words.

Terms:
${termList || '  (none)'}

Respond with exactly this JSON shape:
{
  "category_labels": { "<raw_category>": "<JEOPARDY TITLE>", ... },
  "clues": [
    { "id": <number>, "clue": "...", "acceptable_answers": ["...", "..."] }
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
      const clueText = row.clue ? String(row.clue).trim() : '';
      if (clueText) {
        clues[row.id] = {
          clue: clueText,
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
