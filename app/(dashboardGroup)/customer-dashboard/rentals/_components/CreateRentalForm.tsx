"use client";

import { createRental } from "@/app/(dashboardGroup)/customer-dashboard/rentals/_actions/createRental";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GearDetails } from "@/types/gear";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const rentalSchema = z
  .object({
    startDate: z
      .string()
      .min(1, "Start date is required"),

    endDate: z
      .string()
      .min(1, "End date is required"),

    quantity: z
      .string()
      .min(1, "Quantity is required")
      .refine(
        (value) =>
          Number.isInteger(Number(value)) &&
          Number(value) > 0,
        "Quantity must be a positive whole number",
      ),
  })
  .refine(
    (values) =>
      new Date(values.endDate) >
      new Date(values.startDate),
    {
      path: ["endDate"],
      message: "End date must be after start date",
    },
  );

type RentalFormValues = z.infer<typeof rentalSchema>;

type CreateRentalFormProps = {
  gear: GearDetails;
};

export function CreateRentalForm({
  gear,
}: CreateRentalFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RentalFormValues>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      quantity: "1",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const quantity = Number(watch("quantity") || 0);

  const rentalDays =
    startDate &&
    endDate &&
    new Date(endDate) > new Date(startDate)
      ? Math.ceil(
          (new Date(endDate).getTime() -
            new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const estimatedTotal =
    rentalDays *
    quantity *
    Number(gear.pricePerDay);

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (
    values: RentalFormValues,
  ) => {
    if (Number(values.quantity) > gear.stock) {
      toast.error(
        `Only ${gear.stock} units are available`,
      );
      return;
    }

    const result = await createRental({
      startDate: values.startDate,
      endDate: values.endDate,
      items: [
        {
          gearItemId: gear.id,
          quantity: Number(values.quantity),
        },
      ],
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/customer-dashboard/rentals");
    router.refresh();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <CardTitle>Rental details</CardTitle>

              <CardDescription className="mt-1">
                Choose your rental period and quantity.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start date
                </Label>

                <Input
                  id="startDate"
                  type="date"
                  min={today}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(
                    errors.startDate,
                  )}
                  {...register("startDate")}
                />

                {errors.startDate && (
                  <p className="text-sm text-destructive">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End date
                </Label>

                <Input
                  id="endDate"
                  type="date"
                  min={startDate || today}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.endDate)}
                  {...register("endDate")}
                />

                {errors.endDate && (
                  <p className="text-sm text-destructive">
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="quantity">
                  Quantity
                </Label>

                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={gear.stock}
                  step="1"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(
                    errors.quantity,
                  )}
                  {...register("quantity")}
                />

                <p className="text-sm text-muted-foreground">
                  {gear.stock} units currently available
                </p>

                {errors.quantity && (
                  <p className="text-sm text-destructive">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !gear.isAvailable ||
                  gear.stock === 0
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Creating Rental...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    Confirm Rental
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-lg">
            Order summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Package className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="font-semibold">
                {gear.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {gear.brand}
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Price per day
              </span>

              <span>
                ৳
                {Number(
                  gear.pricePerDay,
                ).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Rental days
              </span>

              <span>{rentalDays}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                Quantity
              </span>

              <span>{quantity || 0}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <span className="font-semibold">
              Estimated total
            </span>

            <span className="text-2xl font-bold text-primary">
              ৳{estimatedTotal.toLocaleString()}
            </span>
          </div>

          <p className="text-xs leading-5 text-muted-foreground">
            The backend will calculate and verify the final
            amount before creating the order.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}