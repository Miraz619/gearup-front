import { GearCard } from "@/app/(publicGroup)/_components/GearCard";
import { Badge } from "@/components/ui/badge";
import { getGears } from "@/service/getGears";
import type { Gear } from "@/types/gear";
import { Boxes } from "lucide-react";

type RelatedGearSectionProps = {
  currentGearId: string;
  categoryId: string;
  categoryName: string;
};

export async function RelatedGearSection({
  currentGearId,
  categoryId,
  categoryName,
}: RelatedGearSectionProps) {
  let relatedGears: Gear[] = [];

  try {
    const response = await getGears({
      page: "1",
      limit: "4",
      category: categoryId,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    relatedGears = response.data
      .filter((gear) => gear.id !== currentGearId)
      .slice(0, 3);
  } catch {
    relatedGears = [];
  }

  if (relatedGears.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Heading */}
      <div className="flex flex-col gap-3">
        <Badge
          variant="secondary"
          className="w-fit"
        >
          <Boxes className="mr-1 size-3.5" />
          Related Gear
        </Badge>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          More from {categoryName}
        </h2>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Explore other gear available in the same category.
        </p>
      </div>

      {/* Related gear cards */}
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedGears.map((gear) => (
          <GearCard
            key={gear.id}
            gear={gear}
          />
        ))}
      </div>
    </div>
  );
}