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

import { getMyPayments } from "@/service/getMypayment";

import type {
  PaymentStatus,
} from "@/types/payment";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Package,
  Receipt,
  Search,
  WalletCards,
  X,
} from "lucide-react";

import Link from "next/link";

type CustomerPaymentsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
};

const PAYMENTS_PER_PAGE = 6;

const paymentStatuses: PaymentStatus[] = [
  "PENDING",
  "COMPLETED",
  "FAILED",
];

const paymentStatusLabel: Record<
  PaymentStatus,
  string
> = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

const paymentStatusClassName: Record<
  PaymentStatus,
  string
> = {
  PENDING:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",

  COMPLETED:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",

  FAILED:
    "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

function formatDate(
  date: string | null,
) {
  if (!date) {
    return "Not available";
  }

  const value = new Date(date);

  if (
    Number.isNaN(
      value.getTime(),
    )
  ) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(value);
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

  return `/customer-dashboard/payments?${params.toString()}`;
}

export default async function CustomerPaymentsPage({
  searchParams,
}: CustomerPaymentsPageProps) {
  const params =
    await searchParams;

  const result =
    await getMyPayments();

  const payments =
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

  const completedPayments =
    payments.filter(
      (payment) =>
        payment.status ===
        "COMPLETED",
    );

  const pendingPayments =
    payments.filter(
      (payment) =>
        payment.status ===
        "PENDING",
    ).length;

  const totalPaid =
    completedPayments.reduce(
      (
        total,
        payment,
      ) =>
        total +
        Number(
          payment.amount,
        ),
      0,
    );

  const totalItems =
    payments.reduce(
      (
        total,
        payment,
      ) =>
        total +
        payment.rentalOrder.items.reduce(
          (
            itemTotal,
            item,
          ) =>
            itemTotal +
            item.quantity,
          0,
        ),
      0,
    );

  /*
   * Search and filtering
   */

  const filteredPayments =
    payments.filter(
      (payment) => {
        const normalizedSearch =
          search.toLowerCase();

        const matchesSearch =
          !normalizedSearch ||
          payment.id
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          payment.transactionId
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          payment.rentalOrderId
            .toLowerCase()
            .includes(
              normalizedSearch,
            );

        const matchesStatus =
          status === "ALL" ||
          payment.status ===
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
        filteredPayments.length /
          PAYMENTS_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    PAYMENTS_PER_PAGE;

  const paginatedPayments =
    filteredPayments.slice(
      startIndex,
      startIndex +
        PAYMENTS_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    status !== "ALL";

  return (
    <div className="space-y-8">
      {/* Heading */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-100 px-6 py-8 shadow-sm dark:border-blue-900 dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-emerald-950/30 sm:px-8">
        <div className="absolute -right-20 -top-20 size-60 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -bottom-20 left-1/3 size-52 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative">
          <Badge className="bg-blue-600 text-white hover:bg-blue-600">
            <CreditCard className="size-3.5" />
            Secure Payment History
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            My Payments
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Review your Stripe
            payments, transaction
            details and rental
            payment activity.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total payments */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Receipt className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Payments
              </p>

              <p className="text-2xl font-bold">
                {payments.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <p className="text-2xl font-bold">
                {
                  completedPayments.length
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <WalletCards className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Pending
              </p>

              <p className="text-2xl font-bold">
                {pendingPayments}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total paid */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white">
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

      {/* Search and filter */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Search and Filter Payments
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/customer-dashboard/payments"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="payment-search"
                className="sr-only"
              >
                Search payments
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="payment-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search payment, transaction or rental"
                className="pl-9"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="payment-status"
                className="sr-only"
              >
                Filter by payment
                status
              </label>

              <select
                id="payment-status"
                name="status"
                defaultValue={
                  status
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All statuses
                </option>

                {paymentStatuses.map(
                  (
                    paymentStatus,
                  ) => (
                    <option
                      key={
                        paymentStatus
                      }
                      value={
                        paymentStatus
                      }
                    >
                      {
                        paymentStatusLabel[
                          paymentStatus
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
                  <Link href="/customer-dashboard/payments">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payment table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>
                Payment History
              </CardTitle>

              <p className="mt-1 text-sm font-normal text-muted-foreground">
                {totalItems} equipment
                units across your
                payment history.
              </p>
            </div>

            <Badge variant="secondary">
              {
                filteredPayments.length
              }{" "}
              {filteredPayments.length ===
              1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedPayments.length ===
          0 ? (
            /* Empty state */
            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <CreditCard className="size-12 text-muted-foreground" />

              <h2 className="mt-4 text-xl font-semibold">
                {hasFilters
                  ? "No matching payments found"
                  : "No payments yet"}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected payment status."
                  : "Completed rental payments will appear here after checkout."}
              </p>

              {hasFilters ? (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/customer-dashboard/payments">
                    Clear Filters
                  </Link>
                </Button>
              ) : (
                <Button
                  className="mt-5"
                  asChild
                >
                  <Link href="/customer-dashboard/rentals">
                    View My Rentals
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[130px]">
                    Payment
                  </TableHead>

                  <TableHead className="min-w-[180px]">
                    Transaction
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    Rental
                  </TableHead>

                  <TableHead>
                    Method
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    Paid At
                  </TableHead>

                  <TableHead>
                    Items
                  </TableHead>

                  <TableHead className="text-right">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedPayments.map(
                  (payment) => {
                    const totalUnits =
                      payment.rentalOrder.items.reduce(
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
                          payment.id
                        }
                      >
                        {/* Payment */}
                        <TableCell>
                          <p className="font-medium">
                            #
                            {payment.id
                              .slice(
                                0,
                                8,
                              )
                              .toUpperCase()}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatDate(
                              payment.createdAt,
                            )}
                          </p>
                        </TableCell>

                        {/* Transaction */}
                        <TableCell>
                          <span className="block max-w-[180px] truncate text-sm">
                            {
                              payment.transactionId
                            }
                          </span>
                        </TableCell>

                        {/* Rental */}
                        <TableCell>
                          <p className="font-medium">
                            #
                            {payment.rentalOrderId
                              .slice(
                                0,
                                8,
                              )
                              .toUpperCase()}
                          </p>
                        </TableCell>

                        {/* Method */}
                        <TableCell>
                          <Badge variant="secondary">
                            {
                              payment.method
                            }
                          </Badge>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              paymentStatusClassName[
                                payment.status
                              ]
                            }
                          >
                            {
                              paymentStatusLabel[
                                payment.status
                              ]
                            }
                          </Badge>
                        </TableCell>

                        {/* Paid date */}
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(
                            payment.paidAt,
                          )}
                        </TableCell>

                        {/* Items */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="size-4 text-primary" />

                            <span>
                              {
                                totalUnits
                              }{" "}
                              {totalUnits ===
                              1
                                ? "unit"
                                : "units"}
                            </span>
                          </div>
                        </TableCell>

                        {/* Amount */}
                        <TableCell className="text-right font-bold">
                          ৳
                          {formatCurrency(
                            payment.amount,
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
      {filteredPayments.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  PAYMENTS_PER_PAGE,
                filteredPayments.length,
              )}{" "}
              of{" "}
              {
                filteredPayments.length
              }{" "}
              payments
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