

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyRentals } from "@/service/getMyRentals";
import type { CustomerRental, RentalStatus } from "@/types/rental";
import PayNowButton from "./_components/PayNowButton";
import {
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  ReceiptText,
  ShoppingBag,
  Sparkles,
  Star,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import ReviewDialog from "./_components/ReviewDialog";

const statusLabel: Record<RentalStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PAID: "Paid",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

const statusClassName: Record<RentalStatus, string> = {
  PLACED:
    "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/70 dark:text-amber-300",
  CONFIRMED:
    "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/70 dark:text-blue-300",
  PAID: "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300",
  PICKED_UP:
    "border-violet-300 bg-violet-100 text-violet-800 dark:border-violet-800 dark:bg-violet-950/70 dark:text-violet-300",
  RETURNED:
    "border-teal-300 bg-teal-100 text-teal-800 dark:border-teal-800 dark:bg-teal-950/70 dark:text-teal-300",
  CANCELLED:
    "border-rose-300 bg-rose-100 text-rose-800 dark:border-rose-800 dark:bg-rose-950/70 dark:text-rose-300",
};

const statusCardClassName: Record<RentalStatus, string> = {
  PLACED:
    "border-l-amber-500 bg-gradient-to-br from-amber-50 via-white to-orange-50/70 dark:from-amber-950/20 dark:via-card dark:to-orange-950/10",
  CONFIRMED:
    "border-l-blue-500 bg-gradient-to-br from-blue-50 via-white to-cyan-50/70 dark:from-blue-950/20 dark:via-card dark:to-cyan-950/10",
  PAID: "border-l-emerald-500 bg-gradient-to-br from-emerald-50 via-white to-green-50/70 dark:from-emerald-950/20 dark:via-card dark:to-green-950/10",
  PICKED_UP:
    "border-l-violet-500 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/70 dark:from-violet-950/20 dark:via-card dark:to-fuchsia-950/10",
  RETURNED:
    "border-l-teal-500 bg-gradient-to-br from-teal-50 via-white to-emerald-50/70 dark:from-teal-950/20 dark:via-card dark:to-emerald-950/10",
  CANCELLED:
    "border-l-rose-500 bg-gradient-to-br from-rose-50 via-white to-red-50/70 dark:from-rose-950/20 dark:via-card dark:to-red-950/10",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatCurrency(value: string | number) {
  return Number(value).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  });
}

function getRentalDays(startDate: string, endDate: string) {
  const difference =
    new Date(endDate).getTime() - new Date(startDate).getTime();

  return Math.max(1, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

function RentalCard({ rental }: { rental: CustomerRental }) {
  const rentalDays = getRentalDays(rental.startDate, rental.endDate);

  const totalUnits = rental.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Card
      className={`group overflow-hidden border-l-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${statusCardClassName[rental.status]}`}
    >
      <CardHeader className="border-b border-border/60 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
              <ReceiptText className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg sm:text-xl">
                  Rental #{rental.id.slice(0, 8).toUpperCase()}
                </CardTitle>

                <Badge
                  variant="outline"
                  className={statusClassName[rental.status]}
                >
                  {statusLabel[rental.status]}
                </Badge>
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarCheck2 className="size-4" />
                Created on {formatDate(rental.createdAt)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:bg-card/80 lg:min-w-48 lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Rental total
            </p>

            <p
              className={`mt-1 text-2xl font-bold ${
                Number(rental.totalAmount) < 0
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              ৳{formatCurrency(rental.totalAmount)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-100/90 to-cyan-50 p-4 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <CalendarDays className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Start date
              </span>
            </div>

            <p className="mt-3 font-semibold text-blue-950 dark:text-blue-100">
              {formatDate(rental.startDate)}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-100/90 to-fuchsia-50 p-4 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
            <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
              <CalendarCheck2 className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                End date
              </span>
            </div>

            <p className="mt-3 font-semibold text-violet-950 dark:text-violet-100">
              {formatDate(rental.endDate)}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-100/90 to-orange-50 p-4 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Clock3 className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Duration
              </span>
            </div>

            <p className="mt-3 font-semibold text-amber-950 dark:text-amber-100">
              {rentalDays} {rentalDays === 1 ? "day" : "days"}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-100/90 to-green-50 p-4 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Package className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Equipment
              </span>
            </div>

            <p className="mt-3 font-semibold text-emerald-950 dark:text-emerald-100">
              {totalUnits} {totalUnits === 1 ? "unit" : "units"}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Rented equipment</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Complete equipment breakdown for this rental.
              </p>
            </div>

            <Badge variant="secondary" className="w-fit">
              {rental.items.length}{" "}
              {rental.items.length === 1 ? "item" : "items"}
            </Badge>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-primary/15 bg-white/70 shadow-sm backdrop-blur dark:bg-card/70">
            <div className="hidden grid-cols-[minmax(0,1fr)_100px_130px_130px] gap-4 border-b bg-gradient-to-r from-primary/10 via-emerald-50 to-cyan-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground dark:from-primary/10 dark:via-emerald-950/20 dark:to-cyan-950/20 md:grid">
              <span>Equipment</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Daily price</span>
              <span className="text-right">Subtotal</span>
            </div>

            <div className="divide-y">
              {rental.items.map((item) => (
               <div
  key={item.id}
  className="grid gap-4 px-5 py-4 transition-colors hover:bg-primary/5 md:grid-cols-[minmax(0,1fr)_100px_130px_130px] md:items-center"
>
  <div className="min-w-0">
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Package className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="truncate font-semibold">
          {item.gearItem.name}
        </p>

        <p className="mt-1 truncate text-sm text-muted-foreground">
          {item.gearItem.brand}
        </p>
      </div>
    </div>

    {rental.status === "RETURNED" && (
      <div className="mt-3">
        <ReviewDialog
          gearItemId={item.gearItemId}
          gearName={item.gearItem.name}
        />
      </div>
    )}
  </div>

  <div className="flex items-center justify-between md:block md:text-center">
    <span className="text-sm text-muted-foreground md:hidden">
      Quantity
    </span>

    <Badge variant="secondary">
      {item.quantity}
    </Badge>
  </div>

  <div className="flex items-center justify-between md:block md:text-right">
    <span className="text-sm text-muted-foreground md:hidden">
      Daily price
    </span>

    <span className="font-medium">
      ৳{formatCurrency(item.pricePerDay)}
    </span>
  </div>

  <div className="flex items-center justify-between md:block md:text-right">
    <span className="text-sm text-muted-foreground md:hidden">
      Subtotal
    </span>

    <span className="font-bold text-primary">
      ৳{formatCurrency(item.subtotal)}
    </span>
  </div>
</div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-4 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between ${
            rental.payment?.status === "COMPLETED"
              ? "border-emerald-200 bg-gradient-to-r from-emerald-100/80 via-green-50 to-teal-50 dark:border-emerald-900 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/20"
              : rental.status === "CONFIRMED"
                ? "border-blue-200 bg-gradient-to-r from-blue-100/80 via-cyan-50 to-indigo-50 dark:border-blue-900 dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-indigo-950/20"
                : rental.status === "CANCELLED"
                  ? "border-rose-200 bg-gradient-to-r from-rose-100/80 via-red-50 to-orange-50 dark:border-rose-900 dark:from-rose-950/30 dark:via-red-950/20 dark:to-orange-950/20"
                  : "border-amber-200 bg-gradient-to-r from-amber-100/80 via-yellow-50 to-orange-50 dark:border-amber-900 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                rental.payment?.status === "COMPLETED"
                  ? "bg-emerald-600 text-white"
                  : rental.status === "CONFIRMED"
                    ? "bg-blue-600 text-white"
                    : rental.status === "CANCELLED"
                      ? "bg-rose-600 text-white"
                      : "bg-amber-500 text-white"
              }`}
            >
              {rental.payment?.status === "COMPLETED" ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <WalletCards className="size-5" />
              )}
            </div>

            <div>
              <p className="font-semibold">Payment status</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {rental.payment?.status === "COMPLETED"
                  ? `Payment completed through ${rental.payment.method}.`
                  : rental.status === "CONFIRMED"
                    ? "Your provider confirmed this order. It is ready for payment."
                    : rental.status === "CANCELLED"
                      ? "This rental was cancelled and cannot be paid."
                      : "Payment becomes available after provider confirmation."}
              </p>
            </div>
          </div>

          {rental.payment?.status === "COMPLETED" ? (
            <Badge className="w-fit bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-600">
              <CheckCircle2 className="size-4" />
              Payment Completed
            </Badge>
          ) : rental.status === "CONFIRMED" ? (
            <PayNowButton rentalOrderId={rental.id} />
          ) : rental.status === "RETURNED" ? (
            <Button variant="outline" disabled>
              <Star className="size-4" />
              Write Review
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function CustomerRentalsPage() {
  const result = await getMyRentals();
  const rentals = result.data;

  const activeRentals = rentals.filter((rental) =>
    ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(rental.status),
  ).length;

  const completedRentals = rentals.filter(
    (rental) => rental.status === "RETURNED",
  ).length;

  const totalPaid = rentals
    .filter((rental) => rental.payment?.status === "COMPLETED")
    .reduce((total, rental) => total + Number(rental.payment?.amount ?? 0), 0);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 px-6 py-8 shadow-sm dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30 sm:px-8">
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
            Track every rental, monitor payment progress, review your equipment,
            and follow each order from booking to return.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm dark:from-emerald-950/40 dark:to-green-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <ReceiptText className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Total rentals
              </p>

              <p className="mt-1 text-3xl font-bold">{rentals.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Active rentals
              </p>

              <p className="mt-1 text-3xl font-bold">{activeRentals}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-teal-200 bg-gradient-to-br from-teal-100 to-cyan-50 shadow-sm dark:border-teal-900 dark:from-teal-950/40 dark:to-cyan-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-teal-800 dark:text-teal-300">
                Completed
              </p>

              <p className="mt-1 text-3xl font-bold">{completedRentals}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-blue-200 bg-gradient-to-br from-blue-100 to-indigo-50 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-indigo-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <CreditCard className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Total paid
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳{formatCurrency(totalPaid)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {rentals.length === 0 ? (
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-emerald-950/20 dark:via-card dark:to-blue-950/20">
          <CardContent className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-emerald-600 text-white shadow-xl">
              <ShoppingBag className="size-9" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              Your rental journey starts here
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              Browse sports and outdoor equipment, choose your dates, and create
              your first GearUp rental.
            </p>

            <Button size="lg" className="mt-7" asChild>
              <Link href="/gear">
                <ShoppingBag className="size-4" />
                Browse Available Gear
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-7">
          {rentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
}
