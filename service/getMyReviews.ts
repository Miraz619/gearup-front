import type { MyReviewsResponse } from "@/types/review";
import { cookies } from "next/headers";

export async function getMyReviews(): Promise<MyReviewsResponse> {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const cookieStore = await cookies();
  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not authenticated");
  }

  const response = await fetch(
    `${backendUrl}/api/reviews`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result: MyReviewsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to retrieve reviews",
    );
  }

  return result;
}