"use server";

import type {
  CreateRentalInput,
  CreateRentalResponse,
} from "@/types/rental";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type CreateRentalActionResult = {
  success: boolean;
  message: string;
  data?: CreateRentalResponse["data"];
  fieldErrors?: Record<string, string[]>;
};

export async function createRental(
  payload: CreateRentalInput,
): Promise<CreateRentalActionResult> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "Backend API URL is not configured",
      };
    }

    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not authenticated",
      };
    }

    const response = await fetch(
      `${backendUrl}/api/rentals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result: CreateRentalResponse & {
      errorSources?: {
        path: string;
        message: string;
      }[];
    } = await response.json();

    if (!response.ok) {
      const fieldErrors = result.errorSources?.reduce<
        Record<string, string[]>
      >((errors, error) => {
        if (!errors[error.path]) {
          errors[error.path] = [];
        }

        errors[error.path].push(error.message);

        return errors;
      }, {});

      return {
        success: false,
        message:
          result.message ||
          "Failed to create rental order",
        fieldErrors,
      };
    }

    revalidatePath("/customer-dashboard");
    revalidatePath("/customer-dashboard/rentals");
    revalidatePath("/gear");

    return {
      success: true,
      message:
        result.message ||
        "Rental order created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create rental error:", error);

    return {
      success: false,
      message:
        "Unable to connect to the rental server",
    };
  }
}