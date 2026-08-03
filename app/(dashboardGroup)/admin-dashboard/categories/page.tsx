import { getAdminCategories } from "@/service/getAdminCategories";
import { CategoryManager } from "./_components/CategoryManager";

export default async function AdminCategoriesPage() {
  const response = await getAdminCategories();

  return (
    <CategoryManager
      initialCategories={response.data}
    />
  );
}