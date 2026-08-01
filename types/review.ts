export type ReviewGearItem = {
  id: string;
  name: string;
  description: string;
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

export type CustomerReview = {
  id: string;
  customerId: string;
  gearItemId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  gearItem: ReviewGearItem;
};

export type MyReviewsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: CustomerReview[];
};