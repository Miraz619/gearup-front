import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteGearButton } from "./_components/DeleteGearButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviderGears } from "@/service/getProviderGears";
import {
  Eye,
  Package,
  PackagePlus,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProviderGearPage() {
  const result = await getProviderGears();
  const gears = result.data;

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Gear
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage the equipment you have listed on
            GearUp.
          </p>
        </div>

        <Button asChild>
          <Link href="/provider-dashboard/gear/create">
            <PackagePlus className="size-4" />
            Add New Gear
          </Link>
        </Button>
      </div>

     
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="size-5" />
          </div>

          <div>
            <CardDescription>Total listed gear</CardDescription>

            <CardTitle className="text-2xl">
              {gears.length}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

  
      {gears.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Package className="size-8" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No gear listed yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Add your first equipment listing so customers can
              discover and rent it through GearUp.
            </p>

            <Button className="mt-6" asChild>
              <Link href="/provider-dashboard/gear/create">
                <PackagePlus className="size-4" />
                Add Your First Gear
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {gears.map((gear) => (
            <Card
              key={gear.id}
              className="group overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
             
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {gear.imageUrl ? (
                  <Image
                    src={gear.imageUrl}
                    alt={gear.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="size-12 text-muted-foreground/50" />
                  </div>
                )}

                <div className="absolute left-3 top-3">
                  <Badge
                    variant={
                      gear.isAvailable
                        ? "default"
                        : "secondary"
                    }
                  >
                    {gear.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="truncate text-lg">
                      {gear.name}
                    </CardTitle>

                    <CardDescription className="mt-1">
                      {gear.brand}
                    </CardDescription>
                  </div>

                  <Badge variant="outline">
                    Stock: {gear.stock}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Price per day
                    </p>

                    <p className="mt-1 text-xl font-bold text-primary">
                      ৳{Number(gear.pricePerDay).toLocaleString()}
                    </p>
                  </div>

                  <Badge variant="secondary">
                    {gear.category?.name || "Uncategorized"}
                  </Badge>
                </div>

               <div className="grid gap-2 sm:grid-cols-3">
  <Button variant="outline" asChild>
    <Link href={`/gear/${gear.id}`}>
      <Eye className="size-4" />
      View
    </Link>
  </Button>

  <Button asChild>
    <Link
      href={`/provider-dashboard/gear/${gear.id}/edit`}
    >
      <Pencil className="size-4" />
      Edit
    </Link>
  </Button>

  <DeleteGearButton
    gearId={gear.id}
    gearName={gear.name}
  />
</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}