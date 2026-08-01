"use server";

import { cookies } from "next/headers";

type CreateCheckoutSessionResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    paymentUrl: string | null;
  };
};

export async function createCheckoutSession(
  rentalOrderId: string,
) {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "BACKEND_API_URL is not configured",
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
      `${backendUrl}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          rentalOrderId,
        }),
        cache: "no-store",
      },
    );

    const result: CreateCheckoutSessionResponse =
      await response.json();

    if (
      !response.ok ||
      !result.success ||
      !result.data?.paymentUrl
    ) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to create checkout session",
      };
    }

    return {
      success: true,
      message: result.message,
      paymentUrl: result.data.paymentUrl,
    };
  } catch {
    return {
      success: false,
      message: "Unable to start payment",
    };
  }
}