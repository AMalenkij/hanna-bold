import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

// Ваши локали и маршруты
import { routing } from "./i18n/routing";

// Middleware для обработки локализации
const intlMiddleware = createMiddleware(routing);

// Определение защищенных маршрутов
const isProtectedRoute = createRouteMatcher(["/protected/(.*)"]); // Укажите свои защищенные маршруты

// Объединение Clerk и Intl middleware
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Проверяем авторизацию для защищённых маршрутов
    await auth.protect();
  }

  // Передача запроса в next-intl middleware
  return intlMiddleware(req);
});

// Конфигурация matcher для Next.js
export const config = {
  matcher: [
    "/",
    "/(ua|pl|en)/:path*", // Ваши локализованные маршруты
    "/protected/:path*", // Защищённые маршруты
    "/api/(.*)", // Обработка API
  ],
};
