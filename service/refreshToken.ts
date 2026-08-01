type RefreshTokenResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
};

type RefreshTokenResult =
  | {
      success: true;
      message: string;
      data: {
        accessToken: string;
      };
    }
  | {
      success: false;
      message: string;
      data: null;
    };

export async function getNewAccessToken(
  refreshToken: string,
): Promise<RefreshTokenResult> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "Backend API URL is not configured",
        data: null,
      };
    }

    if (!refreshToken) {
      return {
        success: false,
        message: "Refresh token is missing",
        data: null,
      };
    }

    const response = await fetch(
      `${backendUrl}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
      },
    );

    const result: RefreshTokenResponse =
      await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Unable to generate a new access token",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: {
        accessToken: result.data.accessToken,
      },
    };
  } catch (error) {
    console.error("Refresh-token error:", error);

    return {
      success: false,
      message:
        "Unable to connect to the authentication server",
      data: null,
    };
  }
}