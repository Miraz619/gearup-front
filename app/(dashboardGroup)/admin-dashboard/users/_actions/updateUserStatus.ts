"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type UpdateUserStatusResponse = {
  success: boolean;
  message: string;
};

export async function updateUserStatus(
  userId: string,
  isActive: boolean,
): Promise<UpdateUserStatusResponse> {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not authenticated",
    };
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          isActive,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message || "Failed to update user status",
      };
    }

    revalidatePath("/admin-dashboard");
    revalidatePath("/admin-dashboard/users");

    return {
      success: true,
      message: result.message || "User status updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while updating the user",
    };
  }
}