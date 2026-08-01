export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
};

export type RegisterResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AuthUser;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    user: AuthUser;
  };
};

export type AuthActionResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};