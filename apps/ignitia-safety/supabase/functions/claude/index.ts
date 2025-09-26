// deno run -A supabase/functions/claude/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import Anthropic from 'npm:@anthropic-ai/sdk@0.29.1';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
if (!ANTHROPIC_API_KEY) console.error('Missing ANTHROPIC_API_KEY');

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY! });

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const { prompt, system = 'Tu es un expert IA & SST.' } = await req.json();

    const msg = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-2025-06-20',
      system,
      max_tokens: 1500,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = msg.content?.map((c:any)=>c.text).join('\n') ?? JSON.stringify(msg);
    return new Response(JSON.stringify({ ok: true, text }), {
      headers: { 'Content-Type': 'application/json' }, status: 200
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      headers: { 'Content-Type': 'application/json' }, status: 500
    });
  }
});
