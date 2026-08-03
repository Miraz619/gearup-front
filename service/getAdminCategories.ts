import type { CategoriesResponse } from "@/types/category";

export async function getAdminCategories(): Promise<CategoriesResponse> {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const response = await fetch(
    `${backendUrl}/api/categories`,
    {
      cache: "no-store",
    },
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to fetch categories",
    );
  }

  return result;
}