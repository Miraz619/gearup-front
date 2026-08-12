"use server";

import { cookies } from "next/headers";

export async function updateProfile(
  payload: { name: string },
) {
  const backendUrl =
    process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return {
      success: false,
      message:
        "Backend API URL is not configured",
    };
  }

  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated",
    };
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/auth/me`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },

        body: JSON.stringify(payload),

        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Unable to update profile",
      };
    }

    return {
      success: true,
      message:
        result.message ||
        "Profile updated successfully",
      user: result.data,
    };
  } catch (error) {
    console.error(
      "Update profile error:",
      error,
    );

    return {
      success: false,
      message:
        "Unable to connect to the server",
    };
  }
}