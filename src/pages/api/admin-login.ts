import type { APIRoute } from 'astro';

const ADMIN_COOKIE = 'admin_session';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== 'string') {
    return new Response(JSON.stringify({ error: 'Cuerpo inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const secret = import.meta.env.ADMIN_SECRET;

  if (body.password !== secret) {
    return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  cookies.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
