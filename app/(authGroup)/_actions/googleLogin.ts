"use server";

import type {
  AuthActionResult,
  LoginResponse,
} from "@/types/auth";
import { cookies } from "next/headers";

function getRefreshToken(response: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };

  const setCookieHeaders =
    headers.getSetCookie?.() ??
    [response.headers.get("set-cookie") || ""];

  const refreshCookie = setCookieHeaders.find(
    (cookie) =>
      cookie.includes("refreshToken="),
  );

  if (!refreshCookie) {
    return null;
  }

  const match = refreshCookie.match(
    /(?:^|,\s*)refreshToken=([^;,\s]+)/,
  );

  return match?.[1] ?? null;
}

export async function googleLogin(
  credential: string,
): Promise<AuthActionResult> {
  try {
    const backendUrl =
      process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message:
          "Backend API URL is not configured",
      };
    }

    if (!credential) {
      return {
        success: false,
        message:
          "Google credential is missing",
      };
    }

    const response = await fetch(
      `${backendUrl}/api/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          credential,
        }),
        cache: "no-store",
      },
    );

    const result: LoginResponse =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Google login failed",
      };
    }

    const refreshToken =
      getRefreshToken(response);

    if (!refreshToken) {
      return {
        success: false,
        message:
          "The authentication session could not be created.",
      };
    }

    const cookieStore =
      await cookies();

    const isProduction =
      process.env.NODE_ENV ===
      "production";

    cookieStore.set(
      "accessToken",
      result.data.accessToken,
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

    cookieStore.set(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction
          ? "none"
          : "lax",
        maxAge:
          60 * 60 * 24 * 7,
        path: "/",
      },
    );

    return {
      success: true,
      message: result.message,
      user: result.data.user,
    };
  } catch (error) {
    console.error(
      "Google login error:",
      error,
    );

    return {
      success: false,
      message:
        "Unable to connect to the server. Please try again.",
    };
  }
}