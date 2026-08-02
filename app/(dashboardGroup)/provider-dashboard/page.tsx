import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProviderGears } from "@/service/getProviderGears";
import { getProviderOrders } from "@/service/getProviderOrders";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMe } from "@/service/getMe";
import {
  ArrowRight,
  BadgeDollarSign,
  Boxes,
  ClipboardList,
  PackagePlus,
  ShieldCheck,
  Store,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const quickActions = [
  {
    title: "Manage Gear",
    description:
      "View, update, and manage all equipment listed by you.",
    href: "/provider-dashboard/gear",
    icon: Boxes,
  },
  {
    title: "Add New Gear",
    description:
      "Create a new equipment listing for customers to rent.",
    href: "/provider-dashboard/gear/create",
    icon: PackagePlus,
  },
  {
    title: "Rental Orders",
    description:
      "Review incoming rental orders and update their status.",
    href: "/provider-dashboard/orders",
    icon: ClipboardList,
  },
  {
    title: "Earnings",
    description:
      "Review completed rentals and payment information.",
    href: "/provider-dashboard/earnings",
    icon: BadgeDollarSign,
  },
];

export default async function ProviderDashboardPage() {
const [userResult, gearResult, orderResult] =
  await Promise.all([
    getMe(),
    getProviderGears(),
    getProviderOrders(),
  ]);

 if (
  !userResult.success ||
  !userResult.data ||
  userResult.data.role !== "PROVIDER"
) {
  redirect("/login");
}

const user = userResult.data;
const gears = gearResult.data;
const orders = orderResult.data;
const totalGear = gears.length;

const availableGear = gears.filter(
  (gear) =>
    gear.isAvailable && gear.stock > 0,
).length;

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

const totalEarnings = orders
  .filter((order) =>
    ["PAID", "PICKED_UP", "RETURNED"].includes(
      order.status,
    ),
  )
  .reduce(
    (total, order) =>
      total + Number(order.totalAmount),
    0,
  );

  return (
    <div className="space-y-6">
    
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="secondary">
                Provider Dashboard
              </Badge>

              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {user.name}
              </h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                Manage your equipment listings, review rental
                requests, update order status, and monitor your
                GearUp provider activity.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="/provider-dashboard/gear/create">
                Add New Gear
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Provider information */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <CardDescription>
                Account status
              </CardDescription>

              <CardTitle className="text-lg">
                {user.isActive ? "Active" : "Suspended"}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Store className="size-5" />
            </div>

            <div>
              <CardDescription>
                Account role
              </CardDescription>

              <CardTitle className="text-lg">
                Provider
              </CardTitle>
            </div>
          </CardHeader>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardDescription>
              Registered email
            </CardDescription>

            <CardTitle className="truncate text-lg">
              {user.email}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Quick actions */}
      <section>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Provider tools
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Access the most important provider features.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Card
                key={action.href}
                className="group transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  <CardTitle className="pt-2 text-lg">
                    {action.title}
                  </CardTitle>

                  <CardDescription className="leading-6">
                    {action.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-0 hover:bg-transparent hover:text-primary"
                    asChild
                  >
                    <Link href={action.href}>
                      Open
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Real API section placeholder */}
    <section>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold tracking-tight">
        Provider overview
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Live information from your gear listings and rental orders.
      </p>
    </div>

    <Button variant="outline" asChild>
      <Link href="/provider-dashboard/orders">
        View All Orders
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  </div>

  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-50 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
          <Boxes className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Total gear
          </p>

          <p className="mt-1 text-3xl font-bold">
            {totalGear}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
          <Store className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Available gear
          </p>

          <p className="mt-1 text-3xl font-bold">
            {availableGear}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
          <ClipboardList className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Active orders
          </p>

          <p className="mt-1 text-3xl font-bold">
            {activeOrders}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
            Completed
          </p>

          <p className="mt-1 text-3xl font-bold">
            {completedOrders}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-teal-200 bg-gradient-to-br from-teal-100 to-cyan-50 shadow-sm dark:border-teal-900 dark:from-teal-950/40 dark:to-cyan-950/20 sm:col-span-2 xl:col-span-1">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
          <BadgeDollarSign className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-teal-800 dark:text-teal-300">
            Total earnings
          </p>

          <p className="mt-1 truncate text-3xl font-bold">
            ৳
            {totalEarnings.toLocaleString("en-BD", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
<section>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold tracking-tight">
        Recent rental orders
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Your three most recent customer rental orders.
      </p>
    </div>

    <Button variant="outline" asChild>
      <Link href="/provider-dashboard/orders">
        View All Orders
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  </div>

  {orders.length === 0 ? (
    <Card className="mt-5 border-dashed">
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <ClipboardList className="size-10 text-muted-foreground" />

        <h3 className="mt-4 font-semibold">
          No rental orders yet
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Customer rental requests for your equipment will appear here.
        </p>
      </CardContent>
    </Card>
  ) : (
    <div className="mt-5 grid gap-4">
      {orders.slice(0, 3).map((order) => (
        <Card
          key={order.id}
          className="border-primary/15 bg-gradient-to-r from-primary/5 via-card to-card transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </p>

                <Badge variant="secondary">
                  {order.status.replaceAll("_", " ")}
                </Badge>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Customer: {order.customer.name}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"} ·{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(order.startDate))}
                {" — "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(order.endDate))}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <p className="text-xl font-bold text-primary">
                ৳
                {Number(order.totalAmount).toLocaleString(
                  "en-BD",
                )}
              </p>

              <Button variant="outline" size="sm" asChild>
                <Link href="/provider-dashboard/orders">
                  Manage
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
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