function normalize(s) {
  return s
    .toLowerCase()
    .replace(/\*/g, ' star ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

export function generateAcceptable(term) {
  const results = [term];

  // "Foo (Bar)" → also accept "Foo" and "Bar"
  const paren = term.match(/^(.+?)\s*\((.+?)\)\s*$/);
  if (paren) {
    results.push(paren[1].trim());
    results.push(paren[2].trim());
  }

  // "X / Y" → accept either side
  if (term.includes(' / ')) {
    term.split(' / ').forEach(p => {
      const t = p.trim();
      if (t.length > 1) results.push(t);
    });
  }

  // "Foo/Bar" without spaces → accept either side
  if (term.includes('/') && !term.includes(' / ')) {
    term.split('/').forEach(p => {
      const t = p.trim();
      if (t.length > 1) results.push(t);
    });
  }

  return [...new Set(results.map(normalize))].filter(Boolean);
}

export function checkAnswer(submitted, correctTerm) {
  const input = normalize(submitted);
  if (!input) return false;

  const acceptable = generateAcceptable(correctTerm);

  for (const ans of acceptable) {
    // exact match
    if (ans === input) return true;

    // fuzzy match for terms longer than 4 chars
    if (ans.length > 4) {
      const maxDist = Math.max(1, Math.floor(ans.length * 0.25));
      if (levenshtein(ans, input) <= maxDist) return true;
    }

    // input contains the answer or vice versa (for partial typing)
    if (ans.length > 3 && input.includes(ans)) return true;
    if (input.length > 3 && ans.includes(input) && input.length >= ans.length * 0.65)
      return true;
  }

  return false;
}
