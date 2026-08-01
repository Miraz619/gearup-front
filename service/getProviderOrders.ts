import type { ProviderOrdersResponse } from "@/types/rental";
import { cookies } from "next/headers";

export async function getProviderOrders(): Promise<ProviderOrdersResponse> {
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
    `${backendUrl}/api/provider/orders`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result: ProviderOrdersResponse =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to retrieve provider orders",
    );
  }

  return result;
}