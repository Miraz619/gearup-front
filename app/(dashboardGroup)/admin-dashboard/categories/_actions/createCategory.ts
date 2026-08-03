"use server";

import { cookies } from "next/headers";

export async function createCategory(
  formData: {
    name: string;
    description?: string;
  },
) {
  const backendUrl =
    process.env.BACKEND_API_URL;

  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${backendUrl}/api/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(formData),
    },
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to create category",
    );
  }

  return result;
}