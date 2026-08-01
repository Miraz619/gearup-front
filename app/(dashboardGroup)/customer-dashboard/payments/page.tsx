import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyPayments } from "@/service/getMypayment";

import type {
  CustomerPayment,
  PaymentStatus,
} from "@/types/payment";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Package,
  Receipt,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

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
    "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  COMPLETED:
    "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  FAILED:
    "border-rose-300 bg-rose-100 text-rose-800 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
};

function formatDate(date: string | null) {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatCurrency(value: string | number) {
  return Number(value).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  });
}

function PaymentCard({
  payment,
}: {
  payment: CustomerPayment;
}) {
  const totalUnits =
    payment.rentalOrder.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

  return (
    <Card className="group overflow-hidden border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-emerald-900 dark:from-emerald-950/20 dark:via-card dark:to-cyan-950/10">
      <CardHeader className="border-b border-emerald-200/60 bg-gradient-to-r from-emerald-100/70 to-cyan-100/50 px-5 py-5 dark:border-emerald-900 dark:from-emerald-950/30 dark:to-cyan-950/20 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md transition-transform group-hover:scale-105">
              <Receipt className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg sm:text-xl">
                  Payment #
                  {payment.id.slice(0, 8).toUpperCase()}
                </CardTitle>

                <Badge
                  variant="outline"
                  className={
                    paymentStatusClassName[payment.status]
                  }
                >
                  {paymentStatusLabel[payment.status]}
                </Badge>
              </div>

              <p className="mt-2 break-all text-sm text-muted-foreground">
                Transaction: {payment.transactionId}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-emerald-900 dark:bg-card/80 lg:min-w-48 lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Amount paid
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              ৳{formatCurrency(payment.amount)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-50 p-4 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <WalletCards className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Method
              </span>
            </div>

            <p className="mt-3 font-semibold">
              {payment.method}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 p-4 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
            <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
              <CalendarDays className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Paid at
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold">
              {formatDate(payment.paidAt)}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 p-4 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Package className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Equipment
              </span>
            </div>

            <p className="mt-3 font-semibold">
              {totalUnits}{" "}
              {totalUnits === 1 ? "unit" : "units"}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-50 p-4 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="size-4" />

              <span className="text-xs font-bold uppercase tracking-wide">
                Rental status
              </span>
            </div>

            <p className="mt-3 font-semibold">
              {payment.rentalOrder.status.replace(
                "_",
                " ",
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-white/70 p-5 shadow-sm backdrop-blur dark:bg-card/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Rental order
              </p>

              <p className="mt-1 font-semibold">
                #
                {payment.rentalOrderId
                  .slice(0, 8)
                  .toUpperCase()}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm font-medium text-muted-foreground">
                Rental period
              </p>

              <p className="mt-1 font-semibold">
                {formatDate(
                  payment.rentalOrder.startDate,
                )}{" "}
                —{" "}
                {formatDate(
                  payment.rentalOrder.endDate,
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/15 bg-white/70 shadow-sm backdrop-blur dark:bg-card/70">
          <div className="grid grid-cols-[minmax(0,1fr)_90px_120px] gap-3 border-b bg-gradient-to-r from-primary/10 to-emerald-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground dark:to-emerald-950/20">
            <span>Gear ID</span>
            <span className="text-center">
              Quantity
            </span>
            <span className="text-right">
              Subtotal
            </span>
          </div>

          <div className="divide-y">
            {payment.rentalOrder.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[minmax(0,1fr)_90px_120px] gap-3 px-4 py-4 text-sm transition-colors hover:bg-primary/5"
              >
                <span className="truncate font-medium">
                  {item.gearItemId}
                </span>

                <span className="text-center font-medium">
                  {item.quantity}
                </span>

                <span className="text-right font-bold text-primary">
                  ৳{formatCurrency(item.subtotal)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function CustomerPaymentsPage() {
  const result = await getMyPayments();
  const payments = result.data;

  const completedPayments = payments.filter(
    (payment) => payment.status === "COMPLETED",
  );

  const totalPaid = completedPayments.reduce(
    (total, payment) =>
      total + Number(payment.amount),
    0,
  );

  const totalItems = payments.reduce(
    (total, payment) =>
      total +
      payment.rentalOrder.items.reduce(
        (itemTotal, item) =>
          itemTotal + item.quantity,
        0,
      ),
    0,
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-100 px-6 py-8 shadow-sm dark:border-blue-900 dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-emerald-950/30 sm:px-8">
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
            Review completed Stripe payments,
            transaction details, rental orders, and
            payment activity.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-50 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <Receipt className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Total payments
              </p>

              <p className="mt-1 text-3xl font-bold">
                {payments.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Total paid
              </p>

              <p className="mt-1 text-3xl font-bold">
                ৳{formatCurrency(totalPaid)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20 sm:col-span-2 xl:col-span-1">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
              <Package className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
                Paid equipment
              </p>

              <p className="mt-1 text-3xl font-bold">
                {totalItems}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {payments.length === 0 ? (
        <Card className="border-dashed border-primary/25 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-blue-950/20 dark:via-card dark:to-emerald-950/20">
          <CardContent className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-600 text-white shadow-xl">
              <CreditCard className="size-9" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              No payments yet
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              Completed rental payments will appear here
              after you pay through Stripe Checkout.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-7">
          {payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
            />
          ))}
        </div>
      )}
    </div>
  );
}