import type { APIRoute } from 'astro';

const ADMIN_COOKIE = 'admin_session';

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(ADMIN_COOKIE, { path: '/' });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
