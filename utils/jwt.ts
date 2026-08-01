import jwt, { type JwtPayload } from "jsonwebtoken";

export type VerifyTokenResult =
  | {
      success: true;
      data: JwtPayload;
      message: string;
    }
  | {
      success: false;
      data: null;
      message: string;
    };

const verifyToken = (
  token: string,
  secret: string,
): VerifyTokenResult => {
  try {
    const decodedToken = jwt.verify(token, secret);

    if (
      !decodedToken ||
      typeof decodedToken === "string"
    ) {
      return {
        success: false,
        data: null,
        message: "Invalid token payload",
      };
    }

    return {
      success: true,
      data: decodedToken,
      message: "Token verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Token verification failed",
    };
  }
};

const decodeToken = (
  token: string,
): JwtPayload | null => {
  const decodedToken = jwt.decode(token);

  if (
    !decodedToken ||
    typeof decodedToken === "string"
  ) {
    return null;
  }

  return decodedToken;
};

export const jwtUtils = {
  verifyToken,
  decodeToken,
};