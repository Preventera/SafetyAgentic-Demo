// deno run -A supabase/functions/gpt5/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import OpenAI from 'npm:openai@5';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
if (!OPENAI_API_KEY) console.error('Missing OPENAI_API_KEY');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY! });

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const { prompt, system, temperature = 0.7, max_tokens = 1500 } = await req.json();

    const resp = await openai.responses.create({
      model: 'gpt-5',
      input: [
        { role: 'system', content: system ?? 'You are an expert assistant for AI in OHS (SST).' },
        { role: 'user', content: prompt }
      ],
      temperature,
      max_output_tokens: max_tokens
    });

    const text = (resp as any).output_text ?? JSON.stringify(resp);
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
