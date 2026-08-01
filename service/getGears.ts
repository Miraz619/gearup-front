import type { GearsResponse } from "@/types/gear";

export type GearQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const getGears = async (
  query: GearQuery = {},
): Promise<GearsResponse> => {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  const url = queryString
    ? `${backendUrl}/api/gear?${queryString}`
    : `${backendUrl}/api/gear`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const result: GearsResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to retrieve gear",
    );
  }

  return result;
};