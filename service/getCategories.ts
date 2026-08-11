import type { CategoriesResponse } from "@/types/category";

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories`,
    {
      next: { revalidate: 300 },
    }
  );

  const result: CategoriesResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to retrieve categories"
    );
  }

  return result;
};