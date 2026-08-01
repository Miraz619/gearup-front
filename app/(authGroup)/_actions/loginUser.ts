"use server";

import type {
  AuthActionResult,
  LoginResponse,
  LoginUserPayload,
} from "@/types/auth";
import { cookies } from "next/headers";

export async function loginUser(
  payload: LoginUserPayload,
): Promise<AuthActionResult> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "Backend API URL is not configured",
      };
    }

    const response = await fetch(
      `${backendUrl}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result: LoginResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Login failed. Please check your credentials.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set(
      "accessToken",
      result.data.accessToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      },
    );

    return {
      success: true,
      message: result.message,
      user: result.data.user,
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message:
        "Unable to connect to the server. Please try again.",
    };
  }
}