import { cookies } from "next/headers";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

type AdminGear = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  brand: string;
  pricePerDay: string | number;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  provider: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
};

type AdminRental = {
  id: string;
  status: string;
  totalAmount: string | number;
};

type AdminUsersResponse = {
  success: boolean;
  message: string;
  data: AdminUser[];
};

type AdminGearResponse = {
  success: boolean;
  message: string;
  data: AdminGear[];
};

type AdminRentalsResponse = {
  success: boolean;
  message: string;
  data: AdminRental[];
};

export async function getAdminDashboardData() {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not authenticated");
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  };

  const [usersResponse, gearResponse, rentalsResponse] =
    await Promise.all([
      fetch(`${backendUrl}/api/admin/users`, requestOptions),
      fetch(`${backendUrl}/api/admin/gear`, requestOptions),
      fetch(`${backendUrl}/api/admin/rentals`, requestOptions),
    ]);

  const usersResult: AdminUsersResponse =
    await usersResponse.json();

  const gearResult: AdminGearResponse =
    await gearResponse.json();

  const rentalsResult: AdminRentalsResponse =
    await rentalsResponse.json();

  if (!usersResponse.ok) {
    throw new Error(
      usersResult.message || "Failed to retrieve users",
    );
  }

  if (!gearResponse.ok) {
    throw new Error(
      gearResult.message || "Failed to retrieve gear",
    );
  }

  if (!rentalsResponse.ok) {
    throw new Error(
      rentalsResult.message || "Failed to retrieve rentals",
    );
  }

  return {
    users: usersResult.data,
    gear: gearResult.data,
    rentals: rentalsResult.data,
  };
}