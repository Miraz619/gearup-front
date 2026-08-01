import { GearCard } from "@/app/(publicGroup)/_components/GearCard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGears } from "@/service/getGears";
import { PackageSearch } from "lucide-react";

type GearPageProps = {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
};

export default async function GearPage({
  searchParams,
}: GearPageProps) {
  const params = await searchParams;

  const response = await getGears({
    page: params.page || "1",
    limit: "9",
    searchTerm: params.searchTerm,
    category: params.category,
    brand: params.brand,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  });

  const gears = response.data;
  const metaData = response.metaData;

  return (
    <section className="min-h-[70vh] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Browse Gear</Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Find the right gear for your activity
          </h1>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Explore sports and outdoor equipment available from
            trusted GearUp providers.
          </p>
        </div>

        {/* Result information */}
        <div className="mt-10 flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="font-semibold">
              Available Gear
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {metaData.total}{" "}
              {metaData.total === 1 ? "item" : "items"} found
            </p>
          </div>

          <Badge variant="outline">
            Page {metaData.page} of {metaData.totalPage}
          </Badge>
        </div>

        {/* Empty state */}
        {gears.length === 0 ? (
          <Card className="mx-auto mt-12 max-w-xl text-center">
            <CardHeader>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
                <PackageSearch className="size-7 text-muted-foreground" />
              </div>

              <CardTitle>No gear found</CardTitle>

              <CardDescription>
                No gear matches the selected category or search
                options. Try changing the filters.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gears.map((gear) => (
              <GearCard
                key={gear.id}
                gear={gear}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}