"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { createCategory } from "../_actions/createCategory";


type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};


type CategoryFormProps = {
  onSuccess: (category: Category) => void;
};


export function CategoryForm({
  onSuccess,
}: CategoryFormProps) {

  const [loading, setLoading] =
    useState(false);


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {

    event.preventDefault();


    const form =
      event.currentTarget;


    const formData =
      new FormData(form);


    const name =
      formData.get("name") as string;


    const description =
      formData.get("description") as string;



    if (!name.trim()) {

      toast.error(
        "Category name is required",
      );

      return;
    }



    try {

      setLoading(true);


      const response =
        await createCategory({
          name,
          description,
        });



      toast.success(
        "Category created successfully",
      );


      onSuccess(response.data);


      form.reset();


    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create category",
      );


    } finally {

      setLoading(false);

    }

  }



  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Category Name
        </label>


        <Input
          name="name"
          placeholder="Example: Cricket"
        />

      </div>



      <div className="space-y-2">

        <label className="text-sm font-medium">
          Description
        </label>


        <Textarea
          name="description"
          placeholder="Describe this category"
          rows={4}
        />

      </div>



      <Button
        disabled={loading}
        className="w-full"
      >

        <Plus className="size-4" />


        {loading
          ? "Creating..."
          : "Create Category"}

      </Button>


    </form>
  );
}