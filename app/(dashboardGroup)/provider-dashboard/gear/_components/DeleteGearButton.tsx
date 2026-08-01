"use client";

import { deleteGear } from "../_actions/deleteGear";

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
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

type DeleteGearButtonProps = {
  gearId: string;
  gearName: string;
};

export function DeleteGearButton({
  gearId,
  gearName,
}: DeleteGearButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const result = await deleteGear(gearId);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: (result) => {
      toast.success(result.message);
      setOpen(false);
      router.refresh();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete gear",
      );
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!deleteMutation.isPending) {
          setOpen(value);
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="w-full"
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this gear?
          </AlertDialogTitle>

          <AlertDialogDescription>
            You are about to permanently delete{" "}
            <span className="font-medium text-foreground">
              {gearName}
            </span>
            . This action cannot be undone. Gear with rental
            records cannot be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteMutation.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete Gear
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}