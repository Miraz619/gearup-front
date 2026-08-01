export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoriesResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
};