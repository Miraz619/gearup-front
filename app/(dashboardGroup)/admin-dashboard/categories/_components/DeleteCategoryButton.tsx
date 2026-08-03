"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory } from "../_actions/deleteCategory";


type DeleteCategoryButtonProps = {
  categoryId: string;
  onSuccess: (categoryId: string) => void;
};


export function DeleteCategoryButton({
  categoryId,
  onSuccess,
}: DeleteCategoryButtonProps) {

  const [loading, setLoading] =
    useState(false);


  async function handleDelete() {

    try {

      setLoading(true);


      await deleteCategory(
        categoryId,
      );


      toast.success(
        "Category deleted successfully",
      );


      onSuccess(categoryId);


    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete category",
      );


    } finally {

      setLoading(false);

    }

  }


  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>

        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
        >

          <Trash2 className="size-4" />

          Delete

        </Button>

      </AlertDialogTrigger>


      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete category?
          </AlertDialogTitle>


          <AlertDialogDescription>
            This action cannot be undone.
            The category will be permanently removed
            from GearUp.
          </AlertDialogDescription>

        </AlertDialogHeader>


        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>


          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >

            {loading
              ? "Deleting..."
              : "Delete"}

          </AlertDialogAction>

        </AlertDialogFooter>


      </AlertDialogContent>

    </AlertDialog>
  );
}