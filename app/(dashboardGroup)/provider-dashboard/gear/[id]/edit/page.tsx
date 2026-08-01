import { EditGearForm } from "../../_components/EditGearForm";

import { Button } from "@/components/ui/button";
import { getCategories } from "@/service/getCategories";
import { getProviderGears } from "@/service/getProviderGears";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditGearPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGearPage({
  params,
}: EditGearPageProps) {
  const { id } = await params;

  const [gearResult, categoryResult] =
    await Promise.all([
      getProviderGears(),
      getCategories(),
    ]);

  const gear = gearResult.data.find(
    (item) => item.id === id,
  );

  if (!gear) {
    notFound();
  }

  const categories = categoryResult.data ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Button
          variant="ghost"
          className="-ml-3 mb-3"
          asChild
        >
          <Link href="/provider-dashboard/gear">
            <ArrowLeft className="size-4" />
            Back to My Gear
          </Link>
        </Button>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Gear
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update the information for{" "}
          <span className="font-medium text-foreground">
            {gear.name}
          </span>
          .
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
          <h2 className="font-semibold">
            No categories are available
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            At least one category is required before this
            gear can be updated.
          </p>
        </div>
      ) : (
        <EditGearForm
          gear={gear}
          categories={categories}
        />
      )}
    </div>
  );
}