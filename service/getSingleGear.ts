import type { GearDetailsResponse } from "@/types/gear";

export const getSingleGear = async (
  gearId: string,
): Promise<GearDetailsResponse> => {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const response = await fetch(
    `${backendUrl}/api/gear/${gearId}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GEAR_NOT_FOUND");
    }

    throw new Error("Failed to retrieve gear details");
  }

  const result: GearDetailsResponse = await response.json();

  return result;
};