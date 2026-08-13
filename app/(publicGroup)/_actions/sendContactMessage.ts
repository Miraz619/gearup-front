"use server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactActionResult = {
  success: boolean;
  message: string;
};

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactActionResult> {
  const backendUrl =
    process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return {
      success: false,
      message:
        "Backend API URL is not configured",
    };
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/contact`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),

        cache: "no-store",
      },
    );

    const result =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Unable to send your message",
      };
    }

    return {
      success: true,
      message:
        result.message ||
        "Message sent successfully",
    };
  } catch (error) {
    console.error(
      "Contact message error:",
      error,
    );

    return {
      success: false,
      message:
        "Unable to connect to the server. Please try again.",
    };
  }
}