import { defineMiddleware } from 'astro:middleware';

const ADMIN_COOKIE = 'admin_session';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';
  const isApiRoute = pathname.startsWith('/api/');

  if (isAdminRoute && !isLoginPage && !isApiRoute) {
    const secret = import.meta.env.ADMIN_SECRET;
    const sessionCookie = context.cookies.get(ADMIN_COOKIE);

    if (!secret || !sessionCookie || sessionCookie.value !== secret) {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
