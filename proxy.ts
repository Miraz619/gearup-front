import type { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getNewAccessToken } from "@/service/refreshToken";
import { jwtUtils } from "@/utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = [
  "/",
  "/gear",
  "/categories",
  "/about",
  "/how-it-works",
  "/privacy",
  "/terms",
];

const ROLE_DASHBOARDS = {
  CUSTOMER: "/customer-dashboard",
  PROVIDER: "/provider-dashboard",
  ADMIN: "/admin-dashboard",
} as const;

type UserRole = keyof typeof ROLE_DASHBOARDS;

type GearUpJwtPayload = JwtPayload & {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole;
};

function isMatchingRoute(
  pathname: string,
  routes: string[],
) {
  return routes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );
}

function getDashboardPath(role: UserRole) {
  return ROLE_DASHBOARDS[role];
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken =
    request.cookies.get("accessToken")?.value;

  const refreshToken =
    request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  let newAccessToken: string | null = null;

 
  if (
    !decodedAccessToken?.success &&
    decodedRefreshToken?.success &&
    refreshToken
  ) {
    const refreshResult =
      await getNewAccessToken(refreshToken);

    if (refreshResult.success) {
      newAccessToken =
        refreshResult.data.accessToken;

      accessToken = newAccessToken;

      decodedAccessToken =
        jwtUtils.verifyToken(
          newAccessToken,
          process.env.JWT_ACCESS_SECRET as string,
        );
    }
  }

  let userRole: UserRole | null = null;

  if (
    decodedAccessToken?.success &&
    decodedAccessToken.data
  ) {
    const payload =
      decodedAccessToken.data as GearUpJwtPayload;

    if (
      payload.role === "CUSTOMER" ||
      payload.role === "PROVIDER" ||
      payload.role === "ADMIN"
    ) {
      userRole = payload.role;
    }
  }

  const isAuthenticated =
    Boolean(accessToken) &&
    Boolean(decodedAccessToken?.success) &&
    Boolean(userRole);

  const isAuthRoute = isMatchingRoute(
    pathname,
    AUTH_ROUTES,
  );

  const isPublicRoute = isMatchingRoute(
    pathname,
    PUBLIC_ROUTES,
  );

  const isCustomerRoute = pathname.startsWith(
    "/customer-dashboard",
  );

  const isProviderRoute = pathname.startsWith(
    "/provider-dashboard",
  );

  const isAdminRoute = pathname.startsWith(
    "/admin-dashboard",
  );

  const isRentalRoute =
    pathname.startsWith("/rentals");

  const isProtectedPaymentRoute =
    pathname === "/payment" ||
    pathname.startsWith("/payment/checkout");

  const isProtectedRoute =
    isCustomerRoute ||
    isProviderRoute ||
    isAdminRoute ||
    isRentalRoute ||
    isProtectedPaymentRoute;

 
  if (isAuthRoute && isAuthenticated && userRole) {
    const redirectResponse =
      NextResponse.redirect(
        new URL(
          getDashboardPath(userRole),
          request.url,
        ),
      );

    if (newAccessToken) {
      setAccessTokenCookie(
        redirectResponse,
        newAccessToken,
      );
    }

    return redirectResponse;
  }

  
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(
      "/login",
      request.url,
    );

    loginUrl.searchParams.set(
      "redirectTo",
      `${pathname}${request.nextUrl.search}`,
    );

    const redirectResponse =
      NextResponse.redirect(loginUrl);

    clearInvalidAccessToken(
      redirectResponse,
      Boolean(accessToken),
    );

    return redirectResponse;
  }

  
  if (
    isCustomerRoute &&
    userRole !== "CUSTOMER"
  ) {
    return redirectToOwnDashboard(
      request,
      userRole,
      newAccessToken,
    );
  }

  if (
    isProviderRoute &&
    userRole !== "PROVIDER"
  ) {
    return redirectToOwnDashboard(
      request,
      userRole,
      newAccessToken,
    );
  }

  if (
    isAdminRoute &&
    userRole !== "ADMIN"
  ) {
    return redirectToOwnDashboard(
      request,
      userRole,
      newAccessToken,
    );
  }

  
  const response = NextResponse.next();

  if (newAccessToken) {
    setAccessTokenCookie(
      response,
      newAccessToken,
    );
  }

  if (
    accessToken &&
    !decodedAccessToken?.success
  ) {
    response.cookies.delete("accessToken");
  }

  return response;
}

function redirectToOwnDashboard(
  request: NextRequest,
  role: UserRole | null,
  newAccessToken: string | null,
) {
  const destination = role
    ? getDashboardPath(role)
    : "/login";

  const response = NextResponse.redirect(
    new URL(destination, request.url),
  );

  if (newAccessToken) {
    setAccessTokenCookie(
      response,
      newAccessToken,
    );
  }

  return response;
}

function setAccessTokenCookie(
  response: NextResponse,
  accessToken: string,
) {
  const isProduction =
    process.env.NODE_ENV === "production";

  response.cookies.set(
    "accessToken",
    accessToken,
    {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? "none"
        : "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    },
  );
}

function clearInvalidAccessToken(
  response: NextResponse,
  hasAccessToken: boolean,
) {
  if (hasAccessToken) {
    response.cookies.delete(
      "accessToken",
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};