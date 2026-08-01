import type { Category } from "@/types/category";

export type GearProvider = {
  id: string;
  name: string;
};

export type Gear = {
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
  category: Category;
  provider: GearProvider;
};

export type GearMetaData = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type GearsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  metaData: GearMetaData;
  data: Gear[];
};

export type GearReview = {
  id: string;
  customerId: string;
  gearItemId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type GearDetailsProvider = {
  id: string;
  name: string;
  email: string;
};

export type GearDetails = Omit<Gear, "provider"> & {
  provider: GearDetailsProvider;
  reviews: GearReview[];
};

export type GearDetailsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: GearDetails;
};

export type ProviderGearsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear[];
};

export type CreateGearInput = {
  name: string;
  description?: string;
  imageUrl?: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  categoryId: string;
};

export type CreateGearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear;
};

export type UpdateGearInput = {
  name?: string;
  description?: string;
  imageUrl?: string;
  brand?: string;
  pricePerDay?: number;
  stock?: number;
  categoryId?: string;
};

export type UpdateGearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear;
};