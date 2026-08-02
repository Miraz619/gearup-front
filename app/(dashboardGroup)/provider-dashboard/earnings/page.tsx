import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviderOrders } from "@/service/getProviderOrders";
import {
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  CreditCard,
  PackageCheck,
  TrendingUp,
} from "lucide-react";

function formatCurrency(value: string | number) {
  return Number(value).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  });
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ProviderEarningsPage() {
  const result = await getProviderOrders();
  const orders = result.data;

  const paidOrders = orders.filter((order) =>
    ["PAID", "PICKED_UP", "RETURNED"].includes(
      order.status,
    ),
  );

  const completedOrders = orders.filter(
    (order) => order.status === "RETURNED",
  );

  const activePaidOrders = orders.filter((order) =>
    ["PAID", "PICKED_UP"].includes(order.status),
  );

  const totalEarnings = paidOrders.reduce(
    (total, order) =>
      total + Number(order.totalAmount),
    0,
  );

  const completedEarnings = completedOrders.reduce(
    (total, order) =>
      total + Number(order.totalAmount),
    0,
  );

  const activeEarnings = activePaidOrders.reduce(
    (total, order) =>
      total + Number(order.totalAmount),
    0,
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 px-6 py-8 shadow-sm dark:border-emerald-900 dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30 sm:px-8">
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
            Review revenue generated from paid, active, and
            completed rental orders.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <BadgeDollarSign className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Total earnings
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳{formatCurrency(totalEarnings)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-50 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <CreditCard className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Paid orders
              </p>

              <p className="mt-1 text-3xl font-bold">
                {paidOrders.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Clock3 className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Active revenue
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳{formatCurrency(activeEarnings)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
              <CheckCircle2 className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
                Completed revenue
              </p>

              <p className="mt-1 truncate text-3xl font-bold">
                ৳{formatCurrency(completedEarnings)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Revenue history
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Rental orders that have successfully reached a paid
            status.
          </p>
        </div>

        {paidOrders.length === 0 ? (
          <Card className="mt-5 border-dashed">
            <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <BadgeDollarSign className="size-12 text-muted-foreground" />

              <h3 className="mt-4 text-xl font-semibold">
                No earnings yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Revenue will appear here after customers complete
                payments for confirmed rental orders.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-5 space-y-4">
            {paidOrders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden border-primary/15 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:from-emerald-950/20 dark:via-card dark:to-cyan-950/10"
              >
                <CardHeader className="border-b border-border/60">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-lg">
                          Order #
                          {order.id.slice(0, 8).toUpperCase()}
                        </CardTitle>

                        <Badge variant="secondary">
                          {order.status.replaceAll("_", " ")}
                        </Badge>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Customer: {order.customer.name}
                      </p>
                    </div>

                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                      ৳{formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Rental period
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {formatDate(order.startDate)} —{" "}
                      {formatDate(order.endDate)}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Equipment
                    </p>

                    <p className="mt-2 flex items-center gap-2 font-medium">
                      <PackageCheck className="size-4 text-primary" />
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "item"
                        : "items"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Order created
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}