function edgeUrl(name: string) {
  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base) throw new Error("Missing VITE_SUPABASE_URL");
  return `${base}/functions/v1/${name}`;
}

export async function askGPT5(prompt: string, system?: string) {
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY; // optionnel mais utile
  const res = await fetch(edgeUrl("gpt5"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(anon ? { apikey: anon, Authorization: `Bearer ${anon}` } : {}),
    },
    body: JSON.stringify({ prompt, system }),
  });

  if (!res.ok) throw new Error(`GPT5 Edge error ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Unknown GPT5 error");
  return data.text as string;
}
