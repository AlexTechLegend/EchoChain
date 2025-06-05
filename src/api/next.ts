export interface Env {
  CLIPS: KVNamespace;
  QUEUE: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const id = await env.QUEUE.list({ prefix: 'clip:' }).then(list => list.keys[0]?.name);
  if (!id) return new Response('No clips', { status: 404 });
  const data = await env.CLIPS.get(id, 'json');
  if (data) {
    await env.CLIPS.put(id, JSON.stringify({ ...data, consumed: true }));
    await env.QUEUE.delete(id);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }
  return new Response('Not found', { status: 404 });
};
