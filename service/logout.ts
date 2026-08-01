"use server";

import { cookies } from "next/headers";

type LogoutResult = {
  success: boolean;
  message: string;
};

export async function logout(): Promise<LogoutResult> {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Logout error:", error);

    return {
      success: false,
      message: "Unable to log out. Please try again.",
    };
  }
}