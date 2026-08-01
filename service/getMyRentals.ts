import type { MyRentalsResponse } from "@/types/rental";
import { cookies } from "next/headers";

export async function getMyRentals(): Promise<MyRentalsResponse> {
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
    `${backendUrl}/api/rentals`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result: MyRentalsResponse =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to retrieve your rental orders",
    );
  }

  return result;
}