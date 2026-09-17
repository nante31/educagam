import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { user } } = await supabase.auth.getUser();

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/login', req.url));
    const { data: profile } = await supabase
      .from('student_profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'super_admin') return NextResponse.redirect(new URL('/journey', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) return NextResponse.redirect(new URL('/login', req.url));
    const { data: profile } = await supabase
      .from('student_profiles').select('role').eq('id', user.id).single();
    if (!['super_admin', 'admin', 'teacher'].includes(profile?.role)) {
      return NextResponse.redirect(new URL('/journey', req.url));
    }
  }
  return res;
}

export const config = { matcher: ['/admin/:path*', '/dashboard/:path*'] };
