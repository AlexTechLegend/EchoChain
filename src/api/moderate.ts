export interface Env {
  MOD: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json();
  const id = body.id;
  await env.MOD.put(id, JSON.stringify(body));
  return new Response('ok');
};
