import type { GetMeResponse } from "@/types/auth";
import { cookies } from "next/headers";

export async function getMe() {
  const backendUrl =
    process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return {
      success: false,
      message:
        "Backend API URL is not configured",
      data: null,
    };
  }

  // IMPORTANT:
  // Keep cookies() OUTSIDE try/catch
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated",
      data: null,
    };
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result: GetMeResponse =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Unable to retrieve user information",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error(
      "Get current user error:",
      error,
    );

    return {
      success: false,
      message:
        "Unable to connect to the authentication server",
      data: null,
    };
  }
}