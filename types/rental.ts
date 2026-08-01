export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type RentalCustomer = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RentalGearItem = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  brand: string;
  pricePerDay: string;
  stock: number;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type RentalOrderItem = {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  subtotal: string;
  gearItem: RentalGearItem;
};

export type ProviderRentalOrder = {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  customer: RentalCustomer;
  items: RentalOrderItem[];
};

export type ProviderOrdersResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProviderRentalOrder[];
};