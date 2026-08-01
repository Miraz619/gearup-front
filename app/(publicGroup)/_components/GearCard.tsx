import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Gear } from "@/types/gear";
import {
  ArrowRight,
  Box,
  PackageCheck,
  PackageX,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type GearCardProps = {
  gear: Gear;
};

export function GearCard({ gear }: GearCardProps) {
  const price = Number(gear.pricePerDay);

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {/* Gear image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {gear.imageUrl ? (
          <Image
            src={gear.imageUrl}
            alt={gear.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-muted">
            <Box className="size-16 text-primary/50" />
          </div>
        )}

        <Badge
          variant={gear.isAvailable ? "default" : "secondary"}
          className="absolute left-3 top-3"
        >
          {gear.isAvailable ? (
            <>
              <PackageCheck className="size-3.5" />
              Available
            </>
          ) : (
            <>
              <PackageX className="size-3.5" />
              Unavailable
            </>
          )}
        </Badge>

        <Badge
          variant="secondary"
          className="absolute right-3 top-3 bg-background/90 backdrop-blur"
        >
          {gear.category.name}
        </Badge>
      </div>

      <CardHeader className="space-y-3">
        <div>
          <p className="text-sm font-medium text-primary">
            {gear.brand}
          </p>

          <h3 className="mt-1 line-clamp-1 text-xl font-semibold">
            {gear.name}
          </h3>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {gear.description || "No description is available for this gear."}
        </p>
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        <div className="flex items-center justify-between rounded-xl bg-muted/60 p-3">
          <div>
            <p className="text-xs text-muted-foreground">
              Rental price
            </p>

            <p className="text-lg font-bold">
              ৳{price.toLocaleString()}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / day
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              Stock
            </p>

            <p className="font-semibold">
              {gear.stock}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound className="size-4" />

          <span>
            Provider:{" "}
            <span className="font-medium text-foreground">
              {gear.provider.name}
            </span>
          </span>
        </div>
      </CardContent>

      <CardFooter className="pb-5">
        <Button className="w-full group/button" asChild>
          <Link href={`/gear/${gear.id}`}>
            View Details

            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}