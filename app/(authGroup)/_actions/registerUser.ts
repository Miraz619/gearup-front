"use server";

import type {
  RegisterResponse,
  RegisterUserPayload,
} from "@/types/auth";

type RegisterActionResult = {
  success: boolean;
  message: string;
  data?: RegisterResponse["data"];
};

export async function registerUser(
  payload: RegisterUserPayload,
): Promise<RegisterActionResult> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "Backend API URL is not configured",
      };
    }

    const response = await fetch(
      `${backendUrl}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          "Registration failed. Please try again.",
      };
    }

    return {
      success: true,
      message: result.message || "Registration successful",
      data: result.data,
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message:
        "Unable to connect to the server. Please try again.",
    };
  }
}