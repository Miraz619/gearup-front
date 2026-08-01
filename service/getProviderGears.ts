import type { ProviderGearsResponse } from "@/types/gear";
import { cookies } from "next/headers";

export async function getProviderGears(): Promise<ProviderGearsResponse> {
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
    `${backendUrl}/api/provider/gear`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result: ProviderGearsResponse =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to retrieve provider gear",
    );
  }

  return result;
}