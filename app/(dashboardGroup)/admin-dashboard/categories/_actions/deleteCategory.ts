"use server";

import { cookies } from "next/headers";

export async function deleteCategory(
  id: string,
) {
  const backendUrl =
    process.env.BACKEND_API_URL;

  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${backendUrl}/api/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to delete category",
    );
  }

  return result;
}