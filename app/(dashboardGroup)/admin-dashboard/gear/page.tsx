import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminDashboardData } from "@/service/getAdminDashboardData";
import {
  Boxes,
  CheckCircle2,
  Layers3,
  PackageCheck,
  PackageX,
  UserRound,
} from "lucide-react";
import Image from "next/image";

function formatCurrency(value: string | number) {
  return Number(value).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  });
}

export default async function AdminGearPage() {
  const { gear } = await getAdminDashboardData();

  const availableGear = gear.filter(
    (item) => item.isAvailable && item.stock > 0,
  ).length;

  const unavailableGear = gear.filter(
    (item) => !item.isAvailable || item.stock === 0,
  ).length;

  const totalStock = gear.reduce(
    (total, item) => total + Number(item.stock || 0),
    0,
  );

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 px-6 py-8 shadow-sm dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30 sm:px-8">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">
          <Badge className="bg-primary text-primary-foreground">
            <Boxes className="size-3.5" />
            Platform Inventory
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Gear Management
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Review all equipment listings, stock availability, categories, and
            provider information.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Boxes className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Listings</p>
              <p className="text-2xl font-bold">{gear.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <PackageCheck className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold">{availableGear}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              <PackageX className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Unavailable</p>
              <p className="text-2xl font-bold">{unavailableGear}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Layers3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Stock</p>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>All Gear Listings</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {gear.length === 0 ? (
            <div className="py-16 text-center">
              <Boxes className="mx-auto size-12 text-muted-foreground" />

              <p className="mt-4 font-semibold">No gear found</p>

              <p className="mt-2 text-sm text-muted-foreground">
                Provider equipment listings will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {gear.map((item) => {
                const isAvailable =
                  item.isAvailable && item.stock > 0;

                return (
                  <div
                    key={item.id}
                    className="grid gap-5 p-5 transition-colors hover:bg-muted/40 lg:grid-cols-[100px_minmax(0,1fr)_auto] lg:items-center"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="100px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Boxes className="size-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold">
                          {item.name}
                        </h2>

                        <Badge variant="secondary">
                          {item.category.name}
                        </Badge>

                        <Badge
                          variant="outline"
                          className={
                            isAvailable
                              ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300"
                          }
                        >
                          {isAvailable ? (
                            <>
                              <CheckCircle2 className="size-3.5" />
                              Available
                            </>
                          ) : (
                            <>
                              <PackageX className="size-3.5" />
                              Unavailable
                            </>
                          )}
                        </Badge>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {item.description || "No description is available."}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span>
                          Brand:{" "}
                          <strong className="text-foreground">
                            {item.brand}
                          </strong>
                        </span>

                        <span>
                          Stock:{" "}
                          <strong className="text-foreground">
                            {item.stock}
                          </strong>
                        </span>

                        <span className="flex items-center gap-1.5">
                          <UserRound className="size-4" />
                          {item.provider.name}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-background px-5 py-4 lg:min-w-40 lg:text-right">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Daily Price
                      </p>

                      <p className="mt-1 text-xl font-bold text-primary">
                        ৳{formatCurrency(item.pricePerDay)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}