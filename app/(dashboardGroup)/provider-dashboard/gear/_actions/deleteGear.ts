"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type DeleteGearResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    id: string;
  };
};

export async function deleteGear(
  gearId: string,
): Promise<DeleteGearResponse> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "Backend API URL is not configured",
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

    const response = await fetch(
      `${backendUrl}/api/provider/gear/${gearId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result: DeleteGearResponse =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        message:
          result.message || "Failed to delete gear",
      };
    }

    revalidatePath("/provider-dashboard");
    revalidatePath("/provider-dashboard/gear");
    revalidatePath("/gear");

    return {
      success: true,
      statusCode: response.status,
      message:
        result.message || "Gear deleted successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Delete gear error:", error);

    return {
      success: false,
      message: "Unable to connect to the gear server",
    };
  }
}