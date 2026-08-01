import { CreateGearForm } from "../_components/CreateGearForm";
import { getCategories } from "@/service/getCategories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateGearPage() {
  const result = await getCategories();
  const categories = result.data ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Button variant="ghost" className="-ml-3 mb-3" asChild>
          <Link href="/provider-dashboard/gear">
            <ArrowLeft className="size-4" />
            Back to My Gear
          </Link>
        </Button>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Add New Gear
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create a new equipment listing for customers to discover and rent.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
          <h2 className="font-semibold">
            No categories are available
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            A category must exist before you can create a gear listing.
          </p>
        </div>
      ) : (
        <CreateGearForm categories={categories} />
      )}
    </div>
  );
}