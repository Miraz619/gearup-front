"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CreateReviewPayload = {
  gearItemId: string;
  rating: number;
  comment?: string;
};

type CreateReviewResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
};

export async function createReview(
  payload: CreateReviewPayload,
) {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "BACKEND_API_URL is not configured",
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
      `${backendUrl}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result: CreateReviewResponse =
      await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to submit review",
      };
    }

    revalidatePath(
      "/customer-dashboard/rentals",
    );

    revalidatePath(
      `/gear/${payload.gearItemId}`,
    );

    return {
      success: true,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "Unable to submit review",
    };
  }
}