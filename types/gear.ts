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