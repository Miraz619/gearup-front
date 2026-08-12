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

import { getProviderOrders } from "@/service/getProviderOrders";

import type { RentalStatus } from "@/types/rental";

import {
  BadgeDollarSign,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  PackageCheck,
  Search,
  TrendingUp,
  X,
} from "lucide-react";

import Link from "next/link";

type ProviderEarningsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

const EARNINGS_PER_PAGE = 6;

const earningStatuses: RentalStatus[] = [
  "PAID",
  "PICKED_UP",
  "RETURNED",
];

const statusLabel: Record<string, string> = {
  PAID: "Paid",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
};

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

function getStatusClass(
  status: RentalStatus,
) {
  switch (status) {
    case "PAID":
      return "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300";

    case "PICKED_UP":
      return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300";

    case "RETURNED":
      return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";

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
    params.set("search", search);
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

  return `/provider-dashboard/earnings?${params.toString()}`;
}

export default async function ProviderEarningsPage({
  searchParams,
}: ProviderEarningsPageProps) {
  const params =
    await searchParams;

  const result =
    await getProviderOrders();

  const orders = result.data;

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
   * Earning orders
   */

  const paidOrders =
    orders.filter((order) =>
      [
        "PAID",
        "PICKED_UP",
        "RETURNED",
      ].includes(order.status),
    );

  const completedOrders =
    orders.filter(
      (order) =>
        order.status ===
        "RETURNED",
    );

  const activePaidOrders =
    orders.filter((order) =>
      [
        "PAID",
        "PICKED_UP",
      ].includes(order.status),
    );

  /*
   * Earnings statistics
   */

  const totalEarnings =
    paidOrders.reduce(
      (total, order) =>
        total +
        Number(
          order.totalAmount,
        ),
      0,
    );

  const completedEarnings =
    completedOrders.reduce(
      (total, order) =>
        total +
        Number(
          order.totalAmount,
        ),
      0,
    );

  const activeEarnings =
    activePaidOrders.reduce(
      (total, order) =>
        total +
        Number(
          order.totalAmount,
        ),
      0,
    );

  /*
   * Search and filtering
   */

  const filteredOrders =
    paidOrders.filter(
      (order) => {
        const normalizedSearch =
          search.toLowerCase();

        const matchesSearch =
          !normalizedSearch ||
          order.id
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          order.customer.name
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          order.customer.email
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          order.items.some(
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
          order.status ===
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
        filteredOrders.length /
          EARNINGS_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    EARNINGS_PER_PAGE;

  const paginatedOrders =
    filteredOrders.slice(
      startIndex,
      startIndex +
        EARNINGS_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    status !== "ALL";

  return (
    <div className="space-y-8">
      {/* Heading */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 px-6 py-8 shadow-sm dark:border-emerald-900 dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30 sm:px-8">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative">
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
            <TrendingUp className="size-3.5" />
            Provider Revenue
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Earnings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Review revenue
            generated from paid,
            active and completed
            rental orders.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total earnings */}
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <BadgeDollarSign className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Total Earnings
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳
                {formatCurrency(
                  totalEarnings,
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Paid orders */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-50 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <CreditCard className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Earning Orders
              </p>

              <p className="mt-1 text-3xl font-bold">
                {
                  paidOrders.length
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active earnings */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Clock3 className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Active Revenue
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳
                {formatCurrency(
                  activeEarnings,
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
              <CheckCircle2 className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
                Completed Revenue
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳
                {formatCurrency(
                  completedEarnings,
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search and filter */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Search Earnings
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/provider-dashboard/earnings"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="earning-search"
                className="sr-only"
              >
                Search earnings
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="earning-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search order, customer or gear"
                className="pl-9"
              />
            </div>

            {/* Status filter */}
            <div>
              <label
                htmlFor="earning-status"
                className="sr-only"
              >
                Filter earnings
                by status
              </label>

              <select
                id="earning-status"
                name="status"
                defaultValue={
                  status
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All earning
                  statuses
                </option>

                {earningStatuses.map(
                  (
                    earningStatus,
                  ) => (
                    <option
                      key={
                        earningStatus
                      }
                      value={
                        earningStatus
                      }
                    >
                      {
                        statusLabel[
                          earningStatus
                        ]
                      }
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
                  <Link href="/provider-dashboard/earnings">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Earnings table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>
                Revenue History
              </CardTitle>

              <p className="mt-1 text-sm font-normal text-muted-foreground">
                Rental orders that
                have reached an
                earning status.
              </p>
            </div>

            <Badge variant="secondary">
              {
                filteredOrders.length
              }{" "}
              {filteredOrders.length ===
              1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedOrders.length ===
          0 ? (
            /* Empty state */
            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <BadgeDollarSign className="size-12 text-muted-foreground" />

              <h3 className="mt-4 text-xl font-semibold">
                {hasFilters
                  ? "No matching earnings found"
                  : "No earnings yet"}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected status."
                  : "Revenue will appear here after rental orders reach a paid status."}
              </p>

              {hasFilters && (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/provider-dashboard/earnings">
                    <X className="size-4" />
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
                    Order
                  </TableHead>

                  <TableHead className="min-w-[190px]">
                    Customer
                  </TableHead>

                  <TableHead className="min-w-[190px]">
                    Rental Period
                  </TableHead>

                  <TableHead>
                    Equipment
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-right">
                    Earnings
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedOrders.map(
                  (order) => {
                    const totalUnits =
                      order.items.reduce(
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
                          order.id
                        }
                      >
                        {/* Order */}
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              #
                              {order.id
                                .slice(
                                  0,
                                  8,
                                )
                                .toUpperCase()}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatDate(
                                order.createdAt,
                              )}
                            </p>
                          </div>
                        </TableCell>

                        {/* Customer */}
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {
                                order
                                  .customer
                                  .name
                              }
                            </p>

                            <p className="max-w-[190px] truncate text-xs text-muted-foreground">
                              {
                                order
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
                              order.startDate,
                            )}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            to{" "}
                            {formatDate(
                              order.endDate,
                            )}
                          </p>
                        </TableCell>

                        {/* Equipment */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PackageCheck className="size-4 text-primary" />

                            <div>
                              <p className="font-medium">
                                {
                                  order.items
                                    .length
                                }{" "}
                                {order.items
                                  .length ===
                                1
                                  ? "item"
                                  : "items"}
                              </p>

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
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusClass(
                              order.status,
                            )}
                          >
                            {statusLabel[
                              order.status
                            ] ||
                              order.status}
                          </Badge>
                        </TableCell>

                        {/* Earnings */}
                        <TableCell className="text-right">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            ৳
                            {formatCurrency(
                              order.totalAmount,
                            )}
                          </span>
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
      {filteredOrders.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  EARNINGS_PER_PAGE,
                filteredOrders.length,
              )}{" "}
              of{" "}
              {
                filteredOrders.length
              }{" "}
              earnings
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