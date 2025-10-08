import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./lib/i18nConfig";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // استثناء بعض المسارات من التحقق
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return;
  }

  // إضافة اللغة (locale) لو مش موجودة
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // protected routes
  const protectedRoutes = [/\/[a-z]{2}\/profile/, /\/[a-z]{2}\/admin/, /\/[a-z]{2}\/wishlist/, /\/[a-z]{2}\/cart/]; 
  const isProtected = protectedRoutes.some((routeRegex) =>
    routeRegex.test(pathname)
  );

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const locale = pathname.split("/")[1] || i18n.defaultLocale;

    if (!token) {
      const loginUrl = new URL(`/${locale}/signIn`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based protection
    const isAdminRoute = /\/[a-z]{2}\/admin/.test(pathname);
    if (isAdminRoute && token.role !== "ADMIN") {
      const unauthorizedUrl = new URL(`/${locale}/unauthorized`, request.url); // Create an unauthorized page
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      بنشمل كل الصفحات اللي فيها لغات 
      زي /en/... أو /ar/...
    */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
