import { DeleteGearButton } from "./_components/DeleteGearButton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getProviderGears } from "@/service/getProviderGears";

import {
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Package,
  PackagePlus,
  PackageX,
  Pencil,
  Search,
  X,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

type ProviderGearPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
    page?: string;
  }>;
};

const GEAR_PER_PAGE = 6;

function formatCurrency(
  value: string | number,
) {
  return Number(value).toLocaleString(
    "en-BD",
    {
      maximumFractionDigits: 2,
    },
  );
}

function createPageUrl({
  page,
  search,
  category,
  status,
}: {
  page: number;
  search: string;
  category: string;
  status: string;
}) {
  const params =
    new URLSearchParams();

  if (search) {
    params.set(
      "search",
      search,
    );
  }

  if (
    category &&
    category !== "ALL"
  ) {
    params.set(
      "category",
      category,
    );
  }

  if (
    status &&
    status !== "ALL"
  ) {
    params.set(
      "status",
      status,
    );
  }

  params.set(
    "page",
    page.toString(),
  );

  return `/provider-dashboard/gear?${params.toString()}`;
}

export default async function ProviderGearPage({
  searchParams,
}: ProviderGearPageProps) {
  const params =
    await searchParams;

  const result =
    await getProviderGears();

  const gears = result.data;

  const search =
    params.search?.trim() || "";

  const category =
    params.category || "ALL";

  const status =
    params.status || "ALL";

  const requestedPage =
    Number(
      params.page || "1",
    );

  const currentPage =
    Number.isInteger(
      requestedPage,
    ) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  /*
   * Statistics
   */

  const availableGear =
    gears.filter(
      (gear) =>
        gear.isAvailable &&
        gear.stock > 0,
    ).length;

  const unavailableGear =
    gears.filter(
      (gear) =>
        !gear.isAvailable ||
        gear.stock === 0,
    ).length;

  const totalStock =
    gears.reduce(
      (total, gear) =>
        total +
        Number(
          gear.stock || 0,
        ),
      0,
    );

  /*
   * Available categories
   */

  const categories =
    Array.from(
      new Set(
        gears
          .map(
            (gear) =>
              gear.category?.name,
          )
          .filter(
            (
              name,
            ): name is string =>
              Boolean(name),
          ),
      ),
    ).sort();

  /*
   * Search and filtering
   */

  const filteredGears =
    gears.filter((gear) => {
      const normalizedSearch =
        search.toLowerCase();

      const gearCategory =
        gear.category?.name ||
        "Uncategorized";

      const isAvailable =
        gear.isAvailable &&
        gear.stock > 0;

      const matchesSearch =
        !normalizedSearch ||
        gear.name
          .toLowerCase()
          .includes(
            normalizedSearch,
          ) ||
        gear.brand
          .toLowerCase()
          .includes(
            normalizedSearch,
          ) ||
        gearCategory
          .toLowerCase()
          .includes(
            normalizedSearch,
          );

      const matchesCategory =
        category === "ALL" ||
        gearCategory ===
          category;

      const matchesStatus =
        status === "ALL" ||
        (status ===
          "AVAILABLE" &&
          isAvailable) ||
        (status ===
          "UNAVAILABLE" &&
          !isAvailable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });

  /*
   * Pagination
   */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredGears.length /
          GEAR_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    GEAR_PER_PAGE;

  const paginatedGears =
    filteredGears.slice(
      startIndex,
      startIndex +
        GEAR_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    category !== "ALL" ||
    status !== "ALL";

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section className="flex flex-col gap-5 rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge variant="secondary">
            <Package className="size-3.5" />
            Provider Inventory
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            My Gear
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            View and manage the
            equipment you have
            listed on GearUp.
          </p>
        </div>

        <Button
          className="w-fit"
          asChild
        >
          <Link href="/provider-dashboard/gear/create">
            <PackagePlus className="size-4" />
            Add New Gear
          </Link>
        </Button>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total listings */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Boxes className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Listings
              </p>

              <p className="text-2xl font-bold">
                {gears.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Available
              </p>

              <p className="text-2xl font-bold">
                {availableGear}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Unavailable */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              <PackageX className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Unavailable
              </p>

              <p className="text-2xl font-bold">
                {unavailableGear}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total stock */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Package className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Stock
              </p>

              <p className="text-2xl font-bold">
                {totalStock}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search and filters */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Search and Filter Gear
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/provider-dashboard/gear"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px_180px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="provider-gear-search"
                className="sr-only"
              >
                Search gear
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="provider-gear-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search name, brand or category"
                className="pl-9"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="provider-category-filter"
                className="sr-only"
              >
                Filter by category
              </label>

              <select
                id="provider-category-filter"
                name="category"
                defaultValue={
                  category
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All categories
                </option>

                {categories.map(
                  (
                    categoryName,
                  ) => (
                    <option
                      key={
                        categoryName
                      }
                      value={
                        categoryName
                      }
                    >
                      {
                        categoryName
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label
                htmlFor="provider-status-filter"
                className="sr-only"
              >
                Filter by
                availability
              </label>

              <select
                id="provider-status-filter"
                name="status"
                defaultValue={
                  status
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All statuses
                </option>

                <option value="AVAILABLE">
                  Available
                </option>

                <option value="UNAVAILABLE">
                  Unavailable
                </option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button type="submit">
                <Search className="size-4" />
                Apply
              </Button>

              {hasFilters && (
                <Button
                  variant="outline"
                  asChild
                >
                  <Link href="/provider-dashboard/gear">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Gear table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              My Gear Listings
            </CardTitle>

            <Badge variant="secondary">
              {filteredGears.length}{" "}
              {filteredGears.length ===
              1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedGears.length ===
          0 ? (
            /* Empty state */
            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Package className="size-8" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {hasFilters
                  ? "No matching gear found"
                  : "No gear listed yet"}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected filters."
                  : "Add your first equipment listing so customers can discover and rent it through GearUp."}
              </p>

              {hasFilters ? (
                <Button
                  variant="outline"
                  className="mt-6"
                  asChild
                >
                  <Link href="/provider-dashboard/gear">
                    <X className="size-4" />
                    Clear Filters
                  </Link>
                </Button>
              ) : (
                <Button
                  className="mt-6"
                  asChild
                >
                  <Link href="/provider-dashboard/gear/create">
                    <PackagePlus className="size-4" />
                    Add Your First Gear
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[240px]">
                    Gear
                  </TableHead>

                  <TableHead>
                    Category
                  </TableHead>

                  <TableHead>
                    Stock
                  </TableHead>

                  <TableHead className="min-w-[120px]">
                    Price / Day
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="min-w-[285px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedGears.map(
                  (gear) => {
                    const isAvailable =
                      gear.isAvailable &&
                      gear.stock > 0;

                    return (
                      <TableRow
                        key={
                          gear.id
                        }
                      >
                        {/* Gear */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border bg-muted">
                              {gear.imageUrl ? (
                                <Image
                                  src={
                                    gear.imageUrl
                                  }
                                  alt={
                                    gear.name
                                  }
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center">
                                  <Package className="size-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[180px] truncate font-medium">
                                {
                                  gear.name
                                }
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {
                                  gear.brand
                                }
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell>
                          <Badge variant="secondary">
                            {gear.category
                              ?.name ||
                              "Uncategorized"}
                          </Badge>
                        </TableCell>

                        {/* Stock */}
                        <TableCell>
                          <Badge variant="outline">
                            {
                              gear.stock
                            }
                          </Badge>
                        </TableCell>

                        {/* Price */}
                        <TableCell className="font-semibold">
                          ৳
                          {formatCurrency(
                            gear.pricePerDay,
                          )}
                        </TableCell>

                        {/* Status */}
                        <TableCell>
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
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {/* View */}
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link
                                href={`/gear/${gear.id}`}
                              >
                                <Eye className="size-4" />
                                View
                              </Link>
                            </Button>

                            {/* Edit */}
                            <Button
                              size="sm"
                              asChild
                            >
                              <Link
                                href={`/provider-dashboard/gear/${gear.id}/edit`}
                              >
                                <Pencil className="size-4" />
                                Edit
                              </Link>
                            </Button>

                            {/* Delete */}
                            <div className="w-[100px]">
                              <DeleteGearButton
                                gearId={
                                  gear.id
                                }
                                gearName={
                                  gear.name
                                }
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredGears.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  GEAR_PER_PAGE,
                filteredGears.length,
              )}{" "}
              of{" "}
              {
                filteredGears.length
              }{" "}
              listings
            </p>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <Button
                variant="outline"
                size="sm"
                disabled={
                  safeCurrentPage ===
                  1
                }
                asChild={
                  safeCurrentPage !==
                  1
                }
              >
                {safeCurrentPage ===
                1 ? (
                  <>
                    <ChevronLeft className="size-4" />
                    Previous
                  </>
                ) : (
                  <Link
                    href={createPageUrl(
                      {
                        page:
                          safeCurrentPage -
                          1,
                        search,
                        category,
                        status,
                      },
                    )}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Link>
                )}
              </Button>

              <Badge variant="outline">
                Page{" "}
                {safeCurrentPage}{" "}
                of {totalPages}
              </Badge>

              {/* Next */}
              <Button
                variant="outline"
                size="sm"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                asChild={
                  safeCurrentPage !==
                  totalPages
                }
              >
                {safeCurrentPage ===
                totalPages ? (
                  <>
                    Next
                    <ChevronRight className="size-4" />
                  </>
                ) : (
                  <Link
                    href={createPageUrl(
                      {
                        page:
                          safeCurrentPage +
                          1,
                        search,
                        category,
                        status,
                      },
                    )}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}