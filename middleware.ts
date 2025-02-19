import { clerkMiddleware, auth as clerkAuth } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

// Конфигурация i18n
const intlMiddleware = createMiddleware({
  locales: ["en", "ua", "pl"],
  defaultLocale: "en",
});

export default clerkMiddleware(async (_auth, req) => {
  // Сначала обрабатываем локализацию
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // Затем проверяем защищенные маршруты
  const { pathname } = req.nextUrl;

  // Защищенные маршруты
  const protectedPaths = ["/api/sign-cloudinary-params"];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const authObject = await clerkAuth();

    // Check if user is signed in and has the required role
    if (!authObject.userId || !authObject.orgRole?.includes("admin")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(ua|pl|en)/:path*", "/api/(.*)"],
};
