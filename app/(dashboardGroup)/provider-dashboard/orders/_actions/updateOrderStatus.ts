"use server";

import type {
  ProviderRentalOrder,
  RentalStatus,
} from "@/types/rental";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type UpdateOrderStatusResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: ProviderRentalOrder;
};

export async function updateOrderStatus(
  orderId: string,
  status: RentalStatus,
): Promise<UpdateOrderStatusResponse> {
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
      `${backendUrl}/api/provider/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          status,
        }),
        cache: "no-store",
      },
    );

    const result: UpdateOrderStatusResponse =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        message:
          result.message ||
          "Failed to update order status",
      };
    }

    revalidatePath("/provider-dashboard");
    revalidatePath("/provider-dashboard/orders");

    return {
      success: true,
      statusCode: response.status,
      message:
        result.message ||
        "Order status updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update order status error:", error);

    return {
      success: false,
      message:
        "Unable to connect to the rental server",
    };
  }
}