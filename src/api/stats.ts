export interface Env {
  STATS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const data = await env.STATS.get('global', 'json') || { clips: 0 };
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
