import PayNowButton from "./_components/PayNowButton";
import ReviewDialog from "./_components/ReviewDialog";

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

import { getMyRentals } from "@/service/getMyRentals";

import type {
  CustomerRental,
  RentalStatus,
} from "@/types/rental";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Package,
  ReceiptText,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import Link from "next/link";

type CustomerRentalsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

const RENTALS_PER_PAGE = 6;

const rentalStatuses: RentalStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
];

const statusLabel: Record<
  RentalStatus,
  string
> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PAID: "Paid",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

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

function getStatusClass(
  status: RentalStatus,
) {
  switch (status) {
    case "PLACED":
      return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300";

    case "CONFIRMED":
      return "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300";

    case "PAID":
      return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";

    case "PICKED_UP":
      return "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300";

    case "RETURNED":
      return "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300";

    case "CANCELLED":
      return "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300";
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

  return `/customer-dashboard/rentals?${params.toString()}`;
}

function matchesRentalSearch(
  rental: CustomerRental,
  search: string,
) {
  const normalizedSearch =
    search.toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  return (
    rental.id
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
    )
  );
}

export default async function CustomerRentalsPage({
  searchParams,
}: CustomerRentalsPageProps) {
  const params =
    await searchParams;

  const result =
    await getMyRentals();

  const rentals =
    result.data;

  const search =
    params.search?.trim() ||
    "";

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

  const totalPaid =
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
              ?.amount ?? 0,
          ),
        0,
      );

  /*
   * Filtering
   */

  const filteredRentals =
    rentals.filter(
      (rental) => {
        const matchesSearch =
          matchesRentalSearch(
            rental,
            search,
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
    <div className="space-y-8">
      {/* Heading */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 px-6 py-8 shadow-sm dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30 sm:px-8">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative">
          <Badge className="bg-primary text-primary-foreground">
            <Sparkles className="size-3.5" />
            Customer Rental Center
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            My Rentals
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Track your rentals,
            payment progress and
            returned equipment.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <ReceiptText className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Rentals
              </p>

              <p className="text-2xl font-bold">
                {rentals.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Rentals
              </p>

              <p className="text-2xl font-bold">
                {activeRentals}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <p className="text-2xl font-bold">
                {completedRentals}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <CreditCard className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Total Paid
              </p>

              <p className="truncate text-2xl font-bold">
                ৳
                {formatCurrency(
                  totalPaid,
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
            action="/customer-dashboard/rentals"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]"
          >
            <div className="relative">
              <label
                htmlFor="customer-rental-search"
                className="sr-only"
              >
                Search rentals
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="customer-rental-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search order, gear or brand"
                className="pl-9"
              />
            </div>

            <div>
              <label
                htmlFor="customer-rental-status"
                className="sr-only"
              >
                Filter by status
              </label>

              <select
                id="customer-rental-status"
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
                      {
                        statusLabel[
                          rentalStatus
                        ]
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

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
                  <Link href="/customer-dashboard/rentals">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Rentals table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              Rental History
            </CardTitle>

            <Badge variant="secondary">
              {
                filteredRentals.length
              }{" "}
              {filteredRentals.length ===
              1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedRentals.length ===
          0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <ShoppingBag className="size-12 text-muted-foreground" />

              <h2 className="mt-4 text-xl font-semibold">
                {hasFilters
                  ? "No matching rentals found"
                  : "No rentals yet"}
              </h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected status."
                  : "Browse available equipment and create your first rental."}
              </p>

              {hasFilters ? (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/customer-dashboard/rentals">
                    Clear Filters
                  </Link>
                </Button>
              ) : (
                <Button
                  className="mt-5"
                  asChild
                >
                  <Link href="/gear">
                    Browse Gear
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[130px]">
                    Rental
                  </TableHead>

                  <TableHead className="min-w-[220px]">
                    Equipment
                  </TableHead>

                  <TableHead className="min-w-[180px]">
                    Period
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

                  <TableHead className="min-w-[180px] text-right">
                    Action
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
                        </TableCell>

                        {/* Equipment */}
                        <TableCell>
                          <div className="space-y-1">
                            {rental.items
                              .slice(
                                0,
                                2,
                              )
                              .map(
                                (
                                  item,
                                ) => (
                                  <div
                                    key={
                                      item.id
                                    }
                                    className="flex items-center gap-2"
                                  >
                                    <Package className="size-3.5 shrink-0 text-primary" />

                                    <span className="max-w-[180px] truncate text-sm">
                                      {
                                        item
                                          .gearItem
                                          .name
                                      }
                                    </span>
                                  </div>
                                ),
                              )}

                            {rental.items
                              .length >
                              2 && (
                              <p className="text-xs text-muted-foreground">
                                +
                                {rental
                                  .items
                                  .length -
                                  2}{" "}
                                more
                              </p>
                            )}

                            <p className="text-xs text-muted-foreground">
                              {
                                totalUnits
                              }{" "}
                              {totalUnits ===
                              1
                                ? "unit"
                                : "units"}
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

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusClass(
                              rental.status,
                            )}
                          >
                            {
                              statusLabel[
                                rental.status
                              ]
                            }
                          </Badge>
                        </TableCell>

                        {/* Payment */}
                        <TableCell>
                          {rental.payment ? (
                            <Badge
                              variant="outline"
                              className={
                                rental
                                  .payment
                                  .status ===
                                "COMPLETED"
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                  : ""
                              }
                            >
                              {
                                rental
                                  .payment
                                  .status
                              }
                            </Badge>
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

                        {/* Actions */}
                        <TableCell>
                          <div className="flex flex-col items-end gap-2">
                            {rental.payment
                              ?.status ===
                            "COMPLETED" ? (
                              <Badge className="bg-emerald-600 text-white">
                                <CheckCircle2 className="size-3.5" />
                                Paid
                              </Badge>
                            ) : rental.status ===
                              "CONFIRMED" ? (
                              <PayNowButton
                                rentalOrderId={
                                  rental.id
                                }
                              />
                            ) : null}

                            {rental.status ===
                              "RETURNED" &&
                              rental.items.map(
                                (
                                  item,
                                ) => (
                                  <ReviewDialog
                                    key={
                                      item.id
                                    }
                                    gearItemId={
                                      item.gearItemId
                                    }
                                    gearName={
                                      item
                                        .gearItem
                                        .name
                                    }
                                  />
                                ),
                              )}
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