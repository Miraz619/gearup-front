"use server";

import type {
  CreateGearInput,
  CreateGearResponse,
} from "@/types/gear";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CreateGearActionResult = {
  success: boolean;
  message: string;
  data?: CreateGearResponse["data"];
  fieldErrors?: Record<string, string[]>;
};

export async function createGear(
  payload: CreateGearInput,
): Promise<CreateGearActionResult> {
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
      `${backendUrl}/api/provider/gear`,
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

    const result: CreateGearResponse & {
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
          result.message || "Failed to create gear",
        fieldErrors,
      };
    }

    revalidatePath("/provider-dashboard");
    revalidatePath("/provider-dashboard/gear");
    revalidatePath("/gear");

    return {
      success: true,
      message:
        result.message || "Gear created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create gear error:", error);

    return {
      success: false,
      message:
        "Unable to connect to the gear server",
    };
  }
}