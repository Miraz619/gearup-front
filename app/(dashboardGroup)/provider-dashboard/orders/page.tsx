// import { Badge } from "@/components/ui/badge";
// import { OrderStatusUpdate } from "./_components/OrderStatusUpdate";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { getProviderOrders } from "@/service/getProviderOrders";
// import type { RentalStatus } from "@/types/rental";
// import {
//   CalendarDays,
//   ClipboardList,
//   Mail,
//   Package,
//   User,
// } from "lucide-react";

// const statusLabel: Record<RentalStatus, string> = {
//   PLACED: "Placed",
//   CONFIRMED: "Confirmed",
//   PAID: "Paid",
//   PICKED_UP: "Picked Up",
//   RETURNED: "Returned",
//   CANCELLED: "Cancelled",
// };

// const statusClassName: Record<RentalStatus, string> = {
//   PLACED:
//     "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",

//   CONFIRMED:
//     "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",

//   PAID:
//     "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",

//   PICKED_UP:
//     "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",

//   RETURNED:
//     "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",

//   CANCELLED:
//     "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
// };

// function formatDate(date: string) {
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).format(new Date(date));
// }

// export default async function ProviderOrdersPage() {
//   const result = await getProviderOrders();
//   const orders = result.data;

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//           Rental Orders
//         </h1>

//         <p className="mt-1 text-sm text-muted-foreground">
//           Review customer rental requests and manage their current
//           status.
//         </p>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-row items-center gap-4">
//           <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
//             <ClipboardList className="size-5" />
//           </div>

//           <div>
//             <CardDescription>Total provider orders</CardDescription>

//             <CardTitle className="text-2xl">
//               {orders.length}
//             </CardTitle>
//           </div>
//         </CardHeader>
//       </Card>

//       {orders.length === 0 ? (
//         <Card>
//           <CardContent className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
//             <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
//               <ClipboardList className="size-8" />
//             </div>

//             <h2 className="mt-5 text-xl font-semibold">
//               No rental orders yet
//             </h2>

//             <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
//               Customer rental requests for your equipment will appear
//               here.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="space-y-5">
//           {orders.map((order) => (
//             <Card key={order.id}>
//               <CardHeader>
//                 <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//                   <div>
//                     <div className="flex flex-wrap items-center gap-2">
//                       <CardTitle className="text-lg">
//                         Order #{order.id.slice(0, 8)}
//                       </CardTitle>

//                       <Badge
//                         variant="outline"
//                         className={statusClassName[order.status]}
//                       >
//                         {statusLabel[order.status]}
//                       </Badge>
//                     </div>

//                     <CardDescription className="mt-2">
//                       Created on {formatDate(order.createdAt)}
//                     </CardDescription>
//                   </div>

//                   <div className="text-left lg:text-right">
//                     <p className="text-xs text-muted-foreground">
//                       Total amount
//                     </p>

//                     <p className="mt-1 text-2xl font-bold text-primary">
//                       ৳
//                       {Number(
//                         order.totalAmount,
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 <div className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2 xl:grid-cols-4">
//                   <div className="flex gap-3">
//                     <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

//                     <div className="min-w-0">
//                       <p className="text-xs text-muted-foreground">
//                         Customer
//                       </p>

//                       <p className="mt-1 truncate text-sm font-medium">
//                         {order.customer.name}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

//                     <div className="min-w-0">
//                       <p className="text-xs text-muted-foreground">
//                         Email
//                       </p>

//                       <p className="mt-1 truncate text-sm font-medium">
//                         {order.customer.email}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

//                     <div>
//                       <p className="text-xs text-muted-foreground">
//                         Start date
//                       </p>

//                       <p className="mt-1 text-sm font-medium">
//                         {formatDate(order.startDate)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

//                     <div>
//                       <p className="text-xs text-muted-foreground">
//                         End date
//                       </p>

//                       <p className="mt-1 text-sm font-medium">
//                         {formatDate(order.endDate)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center gap-2">
//                     <Package className="size-4 text-primary" />

//                     <h3 className="font-semibold">
//                       Rented equipment
//                     </h3>
//                   </div>

//                   <div className="mt-3 space-y-3">
//                     {order.items.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
//                       >
//                         <div className="min-w-0">
//                           <p className="font-medium">
//                             {item.gearItem.name}
//                           </p>

//                           <p className="mt-1 text-sm text-muted-foreground">
//                             {item.gearItem.brand} · Quantity:{" "}
//                             {item.quantity} · ৳
//                             {Number(
//                               item.pricePerDay,
//                             ).toLocaleString()}
//                             /day
//                           </p>
//                         </div>

//                         <div className="shrink-0 sm:text-right">
//                           <p className="text-xs text-muted-foreground">
//                             Subtotal
//                           </p>

//                           <p className="mt-1 font-semibold">
//                             ৳
//                             {Number(
//                               item.subtotal,
//                             ).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                                 <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm font-medium">
//                       Manage order status
//                     </p>

//                     <p className="mt-1 text-sm text-muted-foreground">
//                       Update this rental according to its current stage.
//                     </p>
//                   </div>

//                   <OrderStatusUpdate
//                     orderId={order.id}
//                     currentStatus={order.status}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { OrderStatusUpdate } from "./_components/OrderStatusUpdate";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviderOrders } from "@/service/getProviderOrders";
import type {
  ProviderRentalOrder,
  RentalStatus,
} from "@/types/rental";
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Mail,
  Package,
  UserRound,
} from "lucide-react";

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
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.max(1, Math.ceil((end - start) / oneDay));
}

function OrderCard({
  order,
}: {
  order: ProviderRentalOrder;
}) {
  const totalAmount = Number(order.totalAmount);
  const rentalDays = getRentalDays(
    order.startDate,
    order.endDate,
  );

  return (
    <Card
  className={`overflow-hidden border-border/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
    order.status === "PLACED"
      ? "border-l-4 border-l-amber-500"
      : order.status === "CONFIRMED"
        ? "border-l-4 border-l-blue-500"
        : order.status === "PAID"
          ? "border-l-4 border-l-emerald-500"
          : order.status === "PICKED_UP"
            ? "border-l-4 border-l-violet-500"
            : order.status === "RETURNED"
              ? "border-l-4 border-l-teal-500"
              : "border-l-4 border-l-red-500"
  }`}
>
      <CardHeader
  className={`border-b px-5 py-5 sm:px-6 ${
    order.status === "PLACED"
      ? "bg-amber-50/60 dark:bg-amber-950/20"
      : order.status === "CONFIRMED"
        ? "bg-blue-50/60 dark:bg-blue-950/20"
        : order.status === "PAID"
          ? "bg-emerald-50/60 dark:bg-emerald-950/20"
          : order.status === "PICKED_UP"
            ? "bg-violet-50/60 dark:bg-violet-950/20"
            : order.status === "RETURNED"
              ? "bg-teal-50/60 dark:bg-teal-950/20"
              : "bg-red-50/60 dark:bg-red-950/20"
  }`}
>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg">
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </CardTitle>

                <Badge
                  variant="outline"
                  className={statusClassName[order.status]}
                >
                  {statusLabel[order.status]}
                </Badge>
              </div>

              <CardDescription className="mt-1.5">
                Placed on {formatDate(order.createdAt)}
              </CardDescription>
            </div>
          </div>

          <div className="rounded-xl border bg-background px-4 py-3 lg:min-w-44 lg:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Order total
            </p>

            <p
              className={`mt-1 text-2xl font-bold ${
                totalAmount < 0
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              ৳{formatCurrency(order.totalAmount)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserRound className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Customer
              </span>
            </div>

            <p className="mt-2 truncate font-semibold">
              {order.customer.name}
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="size-3.5" />
              <span className="truncate">
                {order.customer.email}
              </span>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Rental period
              </span>
            </div>

            <p className="mt-2 font-semibold">
              {formatDate(order.startDate)}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              to {formatDate(order.endDate)}
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Duration
              </span>
            </div>

            <p className="mt-2 font-semibold">
              {rentalDays}{" "}
              {rentalDays === 1 ? "day" : "days"}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete rental period
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Equipment
              </span>
            </div>

            <p className="mt-2 font-semibold">
              {order.items.length}{" "}
              {order.items.length === 1 ? "item" : "items"}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              )}{" "}
              total units
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                Rented equipment
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Equipment included in this rental order.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <div className="hidden grid-cols-[minmax(0,1fr)_100px_120px_120px] gap-4 border-b bg-muted/40 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:grid">
              <span>Equipment</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Daily price</span>
              <span className="text-right">Subtotal</span>
            </div>

            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,1fr)_100px_120px_120px] md:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {item.gearItem.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.gearItem.brand}
                    </p>
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

                    <span className="font-semibold">
                      ৳{formatCurrency(item.subtotal)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">
              Manage order status
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Move this order to its next valid rental stage.
            </p>
          </div>

          <OrderStatusUpdate
            orderId={order.id}
            currentStatus={order.status}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ProviderOrdersPage() {
  const result = await getProviderOrders();
  const orders = result.data;

  const activeOrders = orders.filter((order) =>
    [
      "PLACED",
      "CONFIRMED",
      "PAID",
      "PICKED_UP",
    ].includes(order.status),
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "RETURNED",
  ).length;

  const confirmedRevenue = orders
    .filter((order) =>
      ["PAID", "PICKED_UP", "RETURNED"].includes(
        order.status,
      ),
    )
    .reduce(
      (total, order) =>
        total + Math.max(0, Number(order.totalAmount)),
      0,
    );

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-2">
        <Badge
          variant="secondary"
          className="w-fit"
        >
          Provider Management
        </Badge>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Rental Orders
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Review customer bookings, inspect rented equipment,
          and manage each order through its rental lifecycle.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total orders
              </p>

              <p className="mt-1 text-2xl font-bold">
                {orders.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active orders
              </p>

              <p className="mt-1 text-2xl font-bold">
                {activeOrders}
              </p>
            </div>
          </CardContent>
        </Card>

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

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <CircleDollarSign className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Confirmed revenue
              </p>

              <p className="mt-1 truncate text-2xl font-bold">
                ৳{formatCurrency(confirmedRevenue)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ClipboardList className="size-8" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No rental orders yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              New customer bookings for your equipment will
              appear here automatically.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}