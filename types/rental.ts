export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
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


export type CreateRentalItemInput = {
  gearItemId: string;
  quantity: number;
};

export type CreateRentalInput = {
  startDate: string;
  endDate: string;
  items: CreateRentalItemInput[];
};

export type CreateRentalResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
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
};

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED";

export type RentalPayment = {
  id: string;
  rentalOrderId: string;
  transactionId: string;
  stripeSessionId: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CustomerRental = {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  items: RentalOrderItem[];
  payment: RentalPayment | null;
};

export type MyRentalsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerRental[];
};