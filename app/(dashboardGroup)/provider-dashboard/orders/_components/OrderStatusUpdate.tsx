"use client";

import { updateOrderStatus } from "../_actions/updateOrderStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RentalStatus } from "@/types/rental";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type OrderStatusUpdateProps = {
  orderId: string;
  currentStatus: RentalStatus;
};

const nextStatusOptions: Record<
  RentalStatus,
  RentalStatus[]
> = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CANCELLED"],
  PAID: ["PICKED_UP"],
  PICKED_UP: ["RETURNED"],
  RETURNED: [],
  CANCELLED: [],
};

const statusLabel: Record<RentalStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PAID: "Paid",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

export function OrderStatusUpdate({
  orderId,
  currentStatus,
}: OrderStatusUpdateProps) {
  const router = useRouter();
  const availableStatuses =
    nextStatusOptions[currentStatus];

  const mutation = useMutation({
    mutationFn: async (status: RentalStatus) => {
      const result = await updateOrderStatus(
        orderId,
        status,
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },

    onSuccess: (result) => {
      toast.success(result.message);
      router.refresh();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    },
  });

  if (availableStatuses.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No further status update available
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        disabled={mutation.isPending}
        onValueChange={(value) =>
          mutation.mutate(value as RentalStatus)
        }
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>

        <SelectContent>
          {availableStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {statusLabel[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {mutation.isPending && (
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}