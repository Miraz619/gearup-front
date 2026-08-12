import { OrderStatusUpdate } from "./_components/OrderStatusUpdate";

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
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Search,
  X,
} from "lucide-react";

import Link from "next/link";

type ProviderOrdersPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

const ORDERS_PER_PAGE = 6;

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

const statusClassName: Record<
  RentalStatus,
  string
> = {
  PLACED:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",

  CONFIRMED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",

  PAID:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",

  PICKED_UP:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",

  RETURNED:
    "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300",

  CANCELLED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
};

function formatDate(
  value: string,
) {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
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

  return `/provider-dashboard/orders?${params.toString()}`;
}

export default async function ProviderOrdersPage({
  searchParams,
}: ProviderOrdersPageProps) {
  const params =
    await searchParams;

  const result =
    await getProviderOrders();

  const orders = result.data;

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
   * Dashboard statistics
   */

  const activeOrders =
    orders.filter(
      (order) =>
        [
          "PLACED",
          "CONFIRMED",
          "PAID",
          "PICKED_UP",
        ].includes(
          order.status,
        ),
    ).length;

  const completedOrders =
    orders.filter(
      (order) =>
        order.status ===
        "RETURNED",
    ).length;

  const confirmedRevenue =
    orders
      .filter((order) =>
        [
          "PAID",
          "PICKED_UP",
          "RETURNED",
        ].includes(
          order.status,
        ),
      )
      .reduce(
        (
          total,
          order,
        ) =>
          total +
          Math.max(
            0,
            Number(
              order.totalAmount,
            ),
          ),
        0,
      );

  /*
   * Search and filtering
   */

  const filteredOrders =
    orders.filter((order) => {
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
        order.status === status;

      return (
        matchesSearch &&
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
        filteredOrders.length /
          ORDERS_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    ORDERS_PER_PAGE;

  const paginatedOrders =
    filteredOrders.slice(
      startIndex,
      startIndex +
        ORDERS_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    status !== "ALL";

  return (
    <div className="space-y-8">
      {/* Heading */}
      <section className="rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8">
        <Badge variant="secondary">
          <ClipboardList className="size-3.5" />
          Provider Management
        </Badge>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Rental Orders
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Review customer
          bookings, inspect rented
          equipment and manage each
          order through its rental
          lifecycle.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Orders
              </p>

              <p className="mt-1 text-2xl font-bold">
                {orders.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Orders
              </p>

              <p className="mt-1 text-2xl font-bold">
                {activeOrders}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <p className="mt-1 text-2xl font-bold">
                {completedOrders}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <CircleDollarSign className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Confirmed Revenue
              </p>

              <p className="mt-1 truncate text-2xl font-bold">
                ৳
                {formatCurrency(
                  confirmedRevenue,
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
            Search and Filter Orders
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/provider-dashboard/orders"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="provider-order-search"
                className="sr-only"
              >
                Search orders
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="provider-order-search"
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
                htmlFor="provider-order-status"
                className="sr-only"
              >
                Filter by status
              </label>

              <select
                id="provider-order-status"
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

            {/* Buttons */}
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
                  <Link href="/provider-dashboard/orders">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              Customer Rental Orders
            </CardTitle>

            <Badge variant="secondary">
              {filteredOrders.length}{" "}
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
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ClipboardList className="size-8" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {hasFilters
                  ? "No matching orders found"
                  : "No rental orders yet"}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {hasFilters
                  ? "Try changing your search text or selected status."
                  : "New customer bookings for your equipment will appear here automatically."}
              </p>

              {hasFilters && (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/provider-dashboard/orders">
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
                  <TableHead className="min-w-[130px]">
                    Order
                  </TableHead>

                  <TableHead className="min-w-[200px]">
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
                    Total
                  </TableHead>

                  <TableHead className="min-w-[220px] text-right">
                    Update Status
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

                            <p className="max-w-[200px] truncate text-xs text-muted-foreground">
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
                              {totalUnits}{" "}
                              {totalUnits ===
                              1
                                ? "unit"
                                : "units"}
                            </p>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              statusClassName[
                                order.status
                              ]
                            }
                          >
                            {
                              statusLabel[
                                order.status
                              ]
                            }
                          </Badge>
                        </TableCell>

                        {/* Total */}
                        <TableCell className="text-right font-semibold">
                          ৳
                          {formatCurrency(
                            order.totalAmount,
                          )}
                        </TableCell>

                        {/* Status action */}
                        <TableCell>
                          <div className="flex justify-end">
                            <OrderStatusUpdate
                              orderId={
                                order.id
                              }
                              currentStatus={
                                order.status
                              }
                            />
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
      {filteredOrders.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  ORDERS_PER_PAGE,
                filteredOrders.length,
              )}{" "}
              of{" "}
              {
                filteredOrders.length
              }{" "}
              orders
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