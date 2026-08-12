import { GearCard } from "@/app/(publicGroup)/_components/GearCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getGears } from "@/service/getGears";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function LatestGearSection() {
  const response = await getGears({
    page: "1",
    limit: "6",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const gears = response.data;

  if (gears.length === 0) {
    return null;
  }

  return (
    <section className="border-b py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge variant="secondary">
              Latest Gear
            </Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Recently added gear
            </h2>

            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Explore recently added sports and outdoor equipment available
              from GearUp providers.
            </p>
          </div>

          <Button
            variant="outline"
            className="group w-fit"
            asChild
          >
            <Link href="/gear">
              View All Gear

              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Gear cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gears.map((gear) => (
            <GearCard
              key={gear.id}
              gear={gear}
            />
          ))}
        </div>
      </div>
    </section>
  );
}