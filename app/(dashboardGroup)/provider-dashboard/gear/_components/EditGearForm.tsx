"use client";

import { updateGear } from "../_actions/updateGear";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { Category } from "@/types/category";
import type { Gear } from "@/types/gear";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const editGearSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Gear name must be at least 2 characters")
    .max(100, "Gear name cannot exceed 100 characters"),

  brand: z
    .string()
    .trim()
    .min(2, "Brand must be at least 2 characters")
    .max(100, "Brand cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  imageUrl: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        z.string().url().safeParse(value).success,
      "Enter a valid image URL",
    )
    .optional(),

  pricePerDay: z
    .string()
    .trim()
    .min(1, "Price per day is required")
    .refine(
      (value) =>
        !Number.isNaN(Number(value)) &&
        Number(value) > 0,
      "Price per day must be greater than zero",
    ),

  stock: z
    .string()
    .trim()
    .min(1, "Stock is required")
    .refine(
      (value) =>
        Number.isInteger(Number(value)) &&
        Number(value) >= 0,
      "Stock must be a non-negative whole number",
    ),

  categoryId: z
    .string()
    .min(1, "Please select a category"),
});

type EditGearFormValues = z.infer<
  typeof editGearSchema
>;

type EditGearFormProps = {
  gear: Gear;
  categories: Category[];
};

export function EditGearForm({
  gear,
  categories,
}: EditGearFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditGearFormValues>({
    resolver: zodResolver(editGearSchema),
    defaultValues: {
      name: gear.name,
      brand: gear.brand,
      description: gear.description ?? "",
      imageUrl: gear.imageUrl ?? "",
      pricePerDay: String(gear.pricePerDay),
      stock: String(gear.stock),
      categoryId: gear.categoryId,
    },
  });

  const selectedCategory = watch("categoryId");

  const onSubmit = async (
    values: EditGearFormValues,
  ) => {
    const result = await updateGear(gear.id, {
      name: values.name.trim(),
      brand: values.brand.trim(),
      description:
        values.description?.trim() || "",
      imageUrl: values.imageUrl?.trim() || "",
      pricePerDay: Number(values.pricePerDay),
      stock: Number(values.stock),
      categoryId: values.categoryId,
    });

    if (!result.success) {
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(
          ([field, messages]) => {
            if (
              field in editGearSchema.shape &&
              messages.length > 0
            ) {
              setError(
                field as keyof EditGearFormValues,
                {
                  type: "server",
                  message: messages[0],
                },
              );
            }
          },
        );
      }

      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/provider-dashboard/gear");
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Save className="size-5" />
          </div>

          <div>
            <CardTitle>Edit gear listing</CardTitle>

            <CardDescription className="mt-1">
              Update the equipment details, price, stock,
              category, or image.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Gear name
                <span className="text-destructive"> *</span>
              </Label>

              <Input
                id="name"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">
                Brand
                <span className="text-destructive"> *</span>
              </Label>

              <Input
                id="brand"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.brand)}
                {...register("brand")}
              />

              {errors.brand && (
                <p className="text-sm text-destructive">
                  {errors.brand.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerDay">
                Price per day
                <span className="text-destructive"> *</span>
              </Label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ৳
                </span>

                <Input
                  id="pricePerDay"
                  type="number"
                  min="1"
                  step="0.01"
                  className="pl-8"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(
                    errors.pricePerDay,
                  )}
                  {...register("pricePerDay")}
                />
              </div>

              {errors.pricePerDay && (
                <p className="text-sm text-destructive">
                  {errors.pricePerDay.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">
                Stock
                <span className="text-destructive"> *</span>
              </Label>

              <Input
                id="stock"
                type="number"
                min="0"
                step="1"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.stock)}
                {...register("stock")}
              />

              {errors.stock && (
                <p className="text-sm text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>
                Category
                <span className="text-destructive"> *</span>
              </Label>

              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setValue("categoryId", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={Boolean(
                    errors.categoryId,
                  )}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="imageUrl">
                Image URL
                <span className="ml-1 font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>

              <Input
                id="imageUrl"
                type="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.imageUrl)}
                {...register("imageUrl")}
              />

              {errors.imageUrl && (
                <p className="text-sm text-destructive">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">
                Description
                <span className="ml-1 font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>

              <textarea
                id="description"
                rows={6}
                disabled={isSubmitting}
                aria-invalid={Boolean(
                  errors.description,
                )}
                className="flex w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}