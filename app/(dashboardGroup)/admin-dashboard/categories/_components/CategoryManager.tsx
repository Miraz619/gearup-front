"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderTree,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { DeleteCategoryButton } from "./DeleteCategoryButton";


type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};


type CategoryManagerProps = {
  initialCategories: Category[];
};


function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}


export function CategoryManager({
  initialCategories,
}: CategoryManagerProps) {

  const [categories, setCategories] =
    useState(initialCategories);


  function handleCreate(
    category: Category,
  ) {

    setCategories((previous) => [
      category,
      ...previous,
    ]);

  }


  function handleDelete(
    categoryId: string,
  ) {

    setCategories((previous) =>
      previous.filter(
        (category) =>
          category.id !== categoryId,
      ),
    );

  }


  return (
    <div className="space-y-8">

      <section className="rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8">

        <Badge variant="secondary">
          <FolderTree className="size-3.5" />
          Category Management
        </Badge>


        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Manage Categories
        </h1>


        <p className="mt-3 text-sm text-muted-foreground">
          Create and manage equipment categories.
        </p>

      </section>


      <section className="grid gap-6 lg:grid-cols-[380px_1fr]">


        <Card className="h-fit">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">
              <Plus className="size-5" />
              Add Category
            </CardTitle>

          </CardHeader>


          <CardContent>
            <CategoryForm
              onSuccess={handleCreate}
            />
          </CardContent>

        </Card>



        <Card>

          <CardHeader className="border-b">

            <CardTitle>
              All Categories ({categories.length})
            </CardTitle>

          </CardHeader>


          <CardContent className="p-0">

            {categories.length === 0 ? (

              <div className="py-16 text-center">

                <FolderTree className="mx-auto size-12 text-muted-foreground"/>

                <p className="mt-4 font-semibold">
                  No categories found
                </p>

              </div>

            ) : (

              <div className="divide-y">

                {categories.map(
                  (category) => (

                  <div
                    key={category.id}
                    className="flex items-center justify-between p-5"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {category.name}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {category.description ||
                          "No description"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Created{" "}
                        {formatDate(
                          category.createdAt,
                        )}
                      </p>

                    </div>


                    <DeleteCategoryButton
                      categoryId={category.id}
                      onSuccess={handleDelete}
                    />

                  </div>

                ))}

              </div>

            )}

          </CardContent>

        </Card>


      </section>

    </div>
  );
}