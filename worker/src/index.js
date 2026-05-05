const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
const DEFAULT_MODEL = 'claude-haiku-4-5';
const DEFAULT_MAX_TOKENS = 4096;

function corsHeaders(origin, allowed) {
  const allowList = (allowed || '').split(',').map(s => s.trim()).filter(Boolean);
  const allow = allowList.includes(origin) ? origin : allowList[0] || '*';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(body, init = {}, cors = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...cors, ...(init.headers || {}) }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, { status: 405 }, cors);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: 'Worker missing ANTHROPIC_API_KEY' }, { status: 500 }, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, { status: 400 }, cors);
    }
    const prompt = payload && typeof payload.prompt === 'string' ? payload.prompt : '';
    if (!prompt) {
      return json({ error: 'Missing "prompt" string' }, { status: 400 }, cors);
    }

    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': ANTHROPIC_VERSION
      },
      body: JSON.stringify({
        model: payload.model || DEFAULT_MODEL,
        max_tokens: payload.max_tokens || DEFAULT_MAX_TOKENS,
        temperature: payload.temperature ?? 0.8,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return json(
        { error: `Anthropic HTTP ${upstream.status}`, detail: errText.slice(0, 500) },
        { status: upstream.status },
        cors
      );
    }

    const data = await upstream.json();
    const text = Array.isArray(data.content)
      ? data.content.filter(b => b.type === 'text').map(b => b.text).join('')
      : '';
    return json({ text }, { status: 200 }, cors);
  }
};
