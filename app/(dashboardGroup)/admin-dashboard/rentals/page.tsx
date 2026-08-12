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

import { getAdminDashboardData } from "@/service/getAdminDashboardData";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  ReceiptText,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import Link from "next/link";

type AdminRentalsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

const RENTALS_PER_PAGE = 6;

const rentalStatuses = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
];

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

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function formatStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}

function getStatusClass(
  status: string,
) {
  switch (status) {
    case "PLACED":
      return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300";

    case "CONFIRMED":
      return "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300";

    case "PAID":
      return "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300";

    case "PICKED_UP":
      return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";

    case "RETURNED":
      return "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300";

    case "CANCELLED":
      return "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300";

    default:
      return "";
  }
}

function createPageUrl({
  page,
  search,
  status,
}: {
  page: number;
  search: string;
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

  return `/admin-dashboard/rentals?${params.toString()}`;
}

export default async function AdminRentalsPage({
  searchParams,
}: AdminRentalsPageProps) {
  const params =
    await searchParams;

  const { rentals } =
    await getAdminDashboardData();

  const search =
    params.search?.trim() || "";

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
   * Dashboard statistics
   */

  const activeRentals =
    rentals.filter(
      (rental) =>
        [
          "PLACED",
          "CONFIRMED",
          "PAID",
          "PICKED_UP",
        ].includes(
          rental.status,
        ),
    ).length;

  const completedRentals =
    rentals.filter(
      (rental) =>
        rental.status ===
        "RETURNED",
    ).length;

  const cancelledRentals =
    rentals.filter(
      (rental) =>
        rental.status ===
        "CANCELLED",
    ).length;

  const totalRevenue =
    rentals
      .filter(
        (rental) =>
          rental.payment
            ?.status ===
          "COMPLETED",
      )
      .reduce(
        (
          total,
          rental,
        ) =>
          total +
          Number(
            rental.payment
              ?.amount || 0,
          ),
        0,
      );

  /*
   * Search and filtering
   */

  const filteredRentals =
    rentals.filter(
      (rental) => {
        const normalizedSearch =
          search.toLowerCase();

        const matchesSearch =
          !normalizedSearch ||
          rental.id
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          rental.customer.name
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          rental.customer.email
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          rental.items.some(
            (item) =>
              item.gearItem.name
                .toLowerCase()
                .includes(
                  normalizedSearch,
                ) ||
              item.gearItem.brand
                .toLowerCase()
                .includes(
                  normalizedSearch,
                ),
          );

        const matchesStatus =
          status === "ALL" ||
          rental.status ===
            status;

        return (
          matchesSearch &&
          matchesStatus
        );
      },
    );

  /*
   * Pagination
   */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredRentals.length /
          RENTALS_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    RENTALS_PER_PAGE;

  const paginatedRentals =
    filteredRentals.slice(
      startIndex,
      startIndex +
        RENTALS_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    status !== "ALL";

  return (
    <div className="space-y-8 pb-10">
      {/* Heading */}
      <section className="rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8">
        <Badge variant="secondary">
          <ReceiptText className="size-3.5" />
          Platform Rental Activity
        </Badge>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Rental Management
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Review rental orders,
          customers, payments,
          equipment and current
          rental status.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <ShoppingBag className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Rentals
              </p>

              <p className="mt-1 text-2xl font-bold">
                {rentals.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Rentals
              </p>

              <p className="mt-1 text-2xl font-bold">
                {activeRentals}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <p className="mt-1 text-2xl font-bold">
                {
                  completedRentals
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <CreditCard className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Total Revenue
              </p>

              <p className="mt-1 truncate text-2xl font-bold">
                ৳
                {formatCurrency(
                  totalRevenue,
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search and filters */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Search and Filter Rentals
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/admin-dashboard/rentals"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="rental-search"
                className="sr-only"
              >
                Search rentals
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="rental-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search order, customer or gear"
                className="pl-9"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="rental-status"
                className="sr-only"
              >
                Filter by rental
                status
              </label>

              <select
                id="rental-status"
                name="status"
                defaultValue={
                  status
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All statuses
                </option>

                {rentalStatuses.map(
                  (
                    rentalStatus,
                  ) => (
                    <option
                      key={
                        rentalStatus
                      }
                      value={
                        rentalStatus
                      }
                    >
                      {formatStatus(
                        rentalStatus,
                      )}
                    </option>
                  ),
                )}
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
                  <Link href="/admin-dashboard/rentals">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Rental table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              All Rental Orders
            </CardTitle>

            <div className="flex gap-2">
              <Badge variant="secondary">
                {
                  filteredRentals.length
                }{" "}
                {filteredRentals.length ===
                1
                  ? "result"
                  : "results"}
              </Badge>

              <Badge variant="outline">
                {
                  cancelledRentals
                }{" "}
                cancelled
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedRentals.length ===
          0 ? (
            /* Empty state */
            <div className="py-16 text-center">
              <ShoppingBag className="mx-auto size-12 text-muted-foreground" />

              <p className="mt-4 font-semibold">
                No matching
                rentals found
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your
                search or selected
                status.
              </p>

              {hasFilters && (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/admin-dashboard/rentals">
                    Clear Filters
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">
                    Rental
                  </TableHead>

                  <TableHead className="min-w-[200px]">
                    Customer
                  </TableHead>

                  <TableHead className="min-w-[190px]">
                    Period
                  </TableHead>

                  <TableHead>
                    Items
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead>
                    Payment
                  </TableHead>

                  <TableHead className="text-right">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedRentals.map(
                  (rental) => {
                    const totalUnits =
                      rental.items.reduce(
                        (
                          total,
                          item,
                        ) =>
                          total +
                          item.quantity,
                        0,
                      );

                    return (
                      <TableRow
                        key={
                          rental.id
                        }
                      >
                        {/* Rental */}
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              #
                              {rental.id
                                .slice(
                                  0,
                                  8,
                                )
                                .toUpperCase()}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatDate(
                                rental.createdAt,
                              )}
                            </p>
                          </div>
                        </TableCell>

                        {/* Customer */}
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {
                                rental
                                  .customer
                                  .name
                              }
                            </p>

                            <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                              {
                                rental
                                  .customer
                                  .email
                              }
                            </p>
                          </div>
                        </TableCell>

                        {/* Period */}
                        <TableCell>
                          <p className="text-sm">
                            {formatDate(
                              rental.startDate,
                            )}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            to{" "}
                            {formatDate(
                              rental.endDate,
                            )}
                          </p>
                        </TableCell>

                        {/* Items */}
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {
                                totalUnits
                              }{" "}
                              {totalUnits ===
                              1
                                ? "unit"
                                : "units"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {
                                rental
                                  .items
                                  .length
                              }{" "}
                              {rental.items
                                .length ===
                              1
                                ? "item"
                                : "items"}
                            </p>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusClass(
                              rental.status,
                            )}
                          >
                            {formatStatus(
                              rental.status,
                            )}
                          </Badge>
                        </TableCell>

                        {/* Payment */}
                        <TableCell>
                          {rental.payment ? (
                            <div>
                              <Badge variant="secondary">
                                {
                                  rental
                                    .payment
                                    .status
                                }
                              </Badge>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {
                                  rental
                                    .payment
                                    .method
                                }
                              </p>
                            </div>
                          ) : (
                            <Badge variant="outline">
                              Not Paid
                            </Badge>
                          )}
                        </TableCell>

                        {/* Total */}
                        <TableCell className="text-right font-semibold">
                          ৳
                          {formatCurrency(
                            rental.totalAmount,
                          )}
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
      {filteredRentals.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  RENTALS_PER_PAGE,
                filteredRentals.length,
              )}{" "}
              of{" "}
              {
                filteredRentals.length
              }{" "}
              rentals
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