import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminDashboardData } from "@/service/getAdminDashboardData";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  ReceiptText,
  ShoppingBag,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";

const statusTheme = {
  PLACED: {
    label: "Placed",
    card: "border-l-amber-500",
    header:
      "bg-amber-50/70 dark:bg-amber-950/20",
    badge:
      "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  },
  CONFIRMED: {
    label: "Confirmed",
    card: "border-l-blue-500",
    header:
      "bg-blue-50/70 dark:bg-blue-950/20",
    badge:
      "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
  },
  PAID: {
    label: "Paid",
    card: "border-l-violet-500",
    header:
      "bg-violet-50/70 dark:bg-violet-950/20",
    badge:
      "border-violet-300 bg-violet-100 text-violet-800 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300",
  },
  PICKED_UP: {
    label: "Picked Up",
    card: "border-l-emerald-500",
    header:
      "bg-emerald-50/70 dark:bg-emerald-950/20",
    badge:
      "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
  RETURNED: {
    label: "Returned",
    card: "border-l-slate-500",
    header:
      "bg-slate-50 dark:bg-slate-900/50",
    badge:
      "border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
  },
  CANCELLED: {
    label: "Cancelled",
    card: "border-l-rose-500",
    header:
      "bg-rose-50/70 dark:bg-rose-950/20",
    badge:
      "border-rose-300 bg-rose-100 text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300",
  },
};

function formatCurrency(value: string | number) {
  return Number(value).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  });
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getRentalDays(
  startDate: string,
  endDate: string,
) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (
    Number.isNaN(start) ||
    Number.isNaN(end)
  ) {
    return 0;
  }

  return Math.max(
    1,
    Math.ceil(
      (end - start) /
        (1000 * 60 * 60 * 24),
    ),
  );
}

export default async function AdminRentalsPage() {
  const { rentals } =
    await getAdminDashboardData();

  const activeRentals = rentals.filter(
    (rental) =>
      [
        "PLACED",
        "CONFIRMED",
        "PAID",
        "PICKED_UP",
      ].includes(rental.status),
  ).length;

  const completedRentals = rentals.filter(
    (rental) =>
      rental.status === "RETURNED",
  ).length;

  const cancelledRentals = rentals.filter(
    (rental) =>
      rental.status === "CANCELLED",
  ).length;

  const totalRevenue = rentals
    .filter(
      (rental) =>
        rental.payment?.status ===
        "COMPLETED",
    )
    .reduce(
      (total, rental) =>
        total +
        Number(
          rental.payment?.amount || 0,
        ),
      0,
    );

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8">
        <Badge variant="secondary">
          <ReceiptText className="size-3.5" />
          Platform Rental Activity
        </Badge>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Rental Management
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Review every rental order,
          customer, payment, equipment, and
          current rental status.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="shadow-sm">
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

        <Card className="shadow-sm">
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

        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <p className="mt-1 text-2xl font-bold">
                {completedRentals}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            All Rental Orders
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Each order is displayed
            separately for easier review.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {rentals.length} total
          </Badge>

          <Badge variant="outline">
            {cancelledRentals} cancelled
          </Badge>
        </div>
      </div>

      {rentals.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-80 flex-col items-center justify-center text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />

            <h2 className="mt-4 text-lg font-semibold">
              No rentals found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Rental orders will appear
              here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-7">
          {rentals.map(
            (rental, index) => {
              const theme =
                statusTheme[
                  rental.status
                ];

              const rentalDays =
                getRentalDays(
                  rental.startDate,
                  rental.endDate,
                );

              const totalUnits =
                rental.items.reduce(
                  (total, item) =>
                    total +
                    item.quantity,
                  0,
                );

              return (
                <Card
                  key={rental.id}
                  className={`overflow-hidden border-l-4 shadow-sm transition-all duration-300 hover:shadow-md ${theme.card}`}
                >
                  <CardHeader
                    className={`border-b px-5 py-5 sm:px-6 ${theme.header}`}
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background text-lg font-bold shadow-sm">
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <CardTitle className="text-lg sm:text-xl">
                              Rental #
                              {rental.id
                                .slice(0, 8)
                                .toUpperCase()}
                            </CardTitle>

                            <Badge
                              variant="outline"
                              className={
                                theme.badge
                              }
                            >
                              {rental.status ===
                                "CANCELLED" && (
                                <XCircle className="size-3.5" />
                              )}

                              {
                                theme.label
                              }
                            </Badge>
                          </div>

                          <p className="mt-2 text-sm text-muted-foreground">
                            Created{" "}
                            {formatDate(
                              rental.createdAt,
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border bg-background px-5 py-4 shadow-sm lg:min-w-48 lg:text-right">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Order Total
                        </p>

                        <p className="mt-1 text-2xl font-bold">
                          ৳
                          {formatCurrency(
                            rental.totalAmount,
                          )}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 p-5 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border bg-muted/20 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <UserRound className="size-4" />
                          Customer
                        </div>

                        <p className="mt-3 font-semibold">
                          {
                            rental
                              .customer
                              .name
                          }
                        </p>

                        <p className="mt-1 break-all text-sm text-muted-foreground">
                          {
                            rental
                              .customer
                              .email
                          }
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-muted/20 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="size-4" />
                          Rental Period
                        </div>

                        <p className="mt-3 font-semibold">
                          {formatDate(
                            rental.startDate,
                          )}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          to{" "}
                          {formatDate(
                            rental.endDate,
                          )}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-muted/20 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock3 className="size-4" />
                          Duration
                        </div>

                        <p className="mt-3 font-semibold">
                          {rentalDays}{" "}
                          {rentalDays ===
                          1
                            ? "day"
                            : "days"}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {
                            totalUnits
                          }{" "}
                          equipment{" "}
                          {totalUnits ===
                          1
                            ? "unit"
                            : "units"}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-muted/20 p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <WalletCards className="size-4" />
                          Payment
                        </div>

                        {rental.payment ? (
                          <>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge variant="outline">
                                {
                                  rental
                                    .payment
                                    .status
                                }
                              </Badge>

                              <Badge variant="secondary">
                                {
                                  rental
                                    .payment
                                    .method
                                }
                              </Badge>
                            </div>

                            <p className="mt-2 font-semibold">
                              ৳
                              {formatCurrency(
                                rental
                                  .payment
                                  .amount,
                              )}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="mt-3 font-semibold">
                              Not paid
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              Payment has
                              not been
                              created.
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border">
                      <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
                        <div>
                          <h3 className="font-semibold">
                            Rental
                            Equipment
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Equipment
                            included in
                            this order
                          </p>
                        </div>

                        <Badge variant="secondary">
                          {
                            rental.items
                              .length
                          }{" "}
                          {rental.items
                            .length === 1
                            ? "item"
                            : "items"}
                        </Badge>
                      </div>

                      <div className="hidden grid-cols-[minmax(0,1fr)_100px_130px_130px] gap-4 border-b bg-muted/10 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:grid">
                        <span>
                          Equipment
                        </span>

                        <span className="text-center">
                          Quantity
                        </span>

                        <span className="text-right">
                          Daily Price
                        </span>

                        <span className="text-right">
                          Subtotal
                        </span>
                      </div>

                      <div className="divide-y">
                        {rental.items.map(
                          (item) => (
                            <div
                              key={
                                item.id
                              }
                              className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/20 md:grid-cols-[minmax(0,1fr)_100px_130px_130px] md:items-center"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                                  <Package className="size-4" />
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate font-semibold">
                                    {
                                      item
                                        .gearItem
                                        .name
                                    }
                                  </p>

                                  <p className="mt-1 truncate text-sm text-muted-foreground">
                                    {
                                      item
                                        .gearItem
                                        .brand
                                    }
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between md:block md:text-center">
                                <span className="text-sm text-muted-foreground md:hidden">
                                  Quantity
                                </span>

                                <Badge variant="outline">
                                  {
                                    item.quantity
                                  }
                                </Badge>
                              </div>

                              <div className="flex items-center justify-between md:block md:text-right">
                                <span className="text-sm text-muted-foreground md:hidden">
                                  Daily
                                  Price
                                </span>

                                <span className="font-medium">
                                  ৳
                                  {formatCurrency(
                                    item.pricePerDay,
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center justify-between md:block md:text-right">
                                <span className="text-sm text-muted-foreground md:hidden">
                                  Subtotal
                                </span>

                                <span className="font-bold">
                                  ৳
                                  {formatCurrency(
                                    item.subtotal,
                                  )}
                                </span>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            },
          )}
        </section>
      )}
    </div>
  );
}