import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviderOrders } from "@/service/getProviderOrders";
import type { RentalStatus } from "@/types/rental";
import {
  CalendarDays,
  ClipboardList,
  Mail,
  Package,
  User,
} from "lucide-react";

const statusLabel: Record<RentalStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PICKED_UP: "Picked Up",
  RETURNED: "Returned",
  CANCELLED: "Cancelled",
};

const statusClassName: Record<RentalStatus, string> = {
  PLACED:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  CONFIRMED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  PICKED_UP:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",
  RETURNED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  CANCELLED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders();
  const orders = result.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Rental Orders
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review customer rental requests and manage their current
          status.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </div>

          <div>
            <CardDescription>Total provider orders</CardDescription>

            <CardTitle className="text-2xl">
              {orders.length}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ClipboardList className="size-8" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No rental orders yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Customer rental requests for your equipment will appear
              here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(0, 8)}
                      </CardTitle>

                      <Badge
                        variant="outline"
                        className={statusClassName[order.status]}
                      >
                        {statusLabel[order.status]}
                      </Badge>
                    </div>

                    <CardDescription className="mt-2">
                      Created on {formatDate(order.createdAt)}
                    </CardDescription>
                  </div>

                  <div className="text-left lg:text-right">
                    <p className="text-xs text-muted-foreground">
                      Total amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-primary">
                      ৳
                      {Number(
                        order.totalAmount,
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="flex gap-3">
                    <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Customer
                      </p>

                      <p className="mt-1 truncate text-sm font-medium">
                        {order.customer.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Email
                      </p>

                      <p className="mt-1 truncate text-sm font-medium">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Start date
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {formatDate(order.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <div>
                      <p className="text-xs text-muted-foreground">
                        End date
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {formatDate(order.endDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Package className="size-4 text-primary" />

                    <h3 className="font-semibold">
                      Rented equipment
                    </h3>
                  </div>

                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="font-medium">
                            {item.gearItem.name}
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.gearItem.brand} · Quantity:{" "}
                            {item.quantity} · ৳
                            {Number(
                              item.pricePerDay,
                            ).toLocaleString()}
                            /day
                          </p>
                        </div>

                        <div className="shrink-0 sm:text-right">
                          <p className="text-xs text-muted-foreground">
                            Subtotal
                          </p>

                          <p className="mt-1 font-semibold">
                            ৳
                            {Number(
                              item.subtotal,
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}