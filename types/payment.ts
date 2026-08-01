import type { RentalStatus } from "@/types/rental";

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED";

export type PaymentMethod = "STRIPE";

export type PaymentRentalItem = {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  subtotal: string;
};

export type PaymentRentalOrder = {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  items: PaymentRentalItem[];
};

export type CustomerPayment = {
  id: string;
  rentalOrderId: string;
  transactionId: string;
  stripeSessionId: string;
  amount: string;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  rentalOrder: PaymentRentalOrder;
};

export type MyPaymentsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerPayment[];
};