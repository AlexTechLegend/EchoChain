import { v4 as uuid } from 'uuid';

export interface Env {
  CLIPS: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json();
  const id = uuid();
  const clip = { id, ...body, createdAt: Date.now(), consumed: false };
  await env.CLIPS.put(id, JSON.stringify(clip));
  return new Response(JSON.stringify({ id }), { status: 201 });
};
