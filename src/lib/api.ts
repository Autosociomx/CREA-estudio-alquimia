export const callAI = async (prompt: string, maxTokens: number = 2000) => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, maxTokens })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.content;
};
