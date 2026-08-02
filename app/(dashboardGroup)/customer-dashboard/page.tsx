import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyRentals } from "@/service/getMyRentals";
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
  CalendarDays,
  CreditCard,
  PackageSearch,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const quickActions = [
  {
    title: "Browse Gear",
    description:
      "Explore available sports and outdoor equipment.",
    href: "/gear",
    icon: Search,
  },
  {
    title: "My Rentals",
    description:
      "View your current and previous rental orders.",
    href: "/customer-dashboard/rentals",
    icon: CalendarDays,
  },
  {
    title: "Payments",
    description:
      "Check payment history and complete pending payments.",
    href: "/customer-dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "My Reviews",
    description:
      "View and manage reviews you submitted.",
    href: "/customer-dashboard/reviews",
    icon: Star,
  },
];

export default async function CustomerDashboardPage() {

  const [userResult, rentalResult] = await Promise.all([
  getMe(),
  getMyRentals(),
]);

if (
  !userResult.success ||
  !userResult.data ||
  userResult.data.role !== "CUSTOMER"
) {
  redirect("/login");
}

const user = userResult.data;
const rentals = rentalResult.data;
  
const activeRentals = rentals.filter((rental) =>
  ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(
    rental.status,
  ),
).length;

const completedRentals = rentals.filter(
  (rental) => rental.status === "RETURNED",
).length;

const pendingPayments = rentals.filter(
  (rental) =>
    rental.status === "CONFIRMED" &&
    rental.payment?.status !== "COMPLETED",
).length;

const totalPaid = rentals
  .filter(
    (rental) =>
      rental.payment?.status === "COMPLETED",
  )
  .reduce(
    (total, rental) =>
      total + Number(rental.payment?.amount ?? 0),
    0,
  );

  return (
    <div className="space-y-6">
     
      <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="secondary">
                Customer Dashboard
              </Badge>

              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {user.name}
              </h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                Browse available equipment, manage your rental
                orders, complete payments, and share your
                experience with GearUp providers.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="/gear">
                Browse Available Gear
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

    
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
              <PackageSearch className="size-5" />
            </div>

            <div className="min-w-0">
              <CardDescription>
                Account role
              </CardDescription>

              <CardTitle className="text-lg">
                Customer
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

    
      <section>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Quick actions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Access the most important customer features.
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

   
     <section>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold tracking-tight">
        Rental overview
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Live information from your rental and payment history.
      </p>
    </div>

    <Button variant="outline" asChild>
      <Link href="/customer-dashboard/rentals">
        View All Rentals
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  </div>

  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <Card className="border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-50 shadow-sm dark:border-blue-900 dark:from-blue-950/40 dark:to-cyan-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
          <CalendarDays className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Active rentals
          </p>

          <p className="mt-1 text-3xl font-bold">
            {activeRentals}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-green-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
          <PackageSearch className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Completed rentals
          </p>

          <p className="mt-1 text-3xl font-bold">
            {completedRentals}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
          <CreditCard className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Pending payments
          </p>

          <p className="mt-1 text-3xl font-bold">
            {pendingPayments}
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
          <CreditCard className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
            Total paid
          </p>

          <p className="mt-1 truncate text-3xl font-bold">
            ৳
            {totalPaid.toLocaleString("en-BD", {
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
        Recent rentals
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Your three most recent rental orders.
      </p>
    </div>

    <Button variant="outline" asChild>
      <Link href="/customer-dashboard/rentals">
        View All
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  </div>

  {rentals.length === 0 ? (
    <Card className="mt-5 border-dashed">
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <PackageSearch className="size-10 text-muted-foreground" />

        <h3 className="mt-4 font-semibold">
          No rentals yet
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Browse available gear and create your first rental.
        </p>

        <Button className="mt-5" asChild>
          <Link href="/gear">
            Browse Gear
          </Link>
        </Button>
      </CardContent>
    </Card>
  ) : (
    <div className="mt-5 grid gap-4">
      {rentals.slice(0, 3).map((rental) => (
        <Card
          key={rental.id}
          className="border-primary/15 bg-gradient-to-r from-primary/5 via-card to-card"
        >
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">
                  Rental #{rental.id.slice(0, 8).toUpperCase()}
                </p>

                <Badge variant="secondary">
                  {rental.status.replaceAll("_", " ")}
                </Badge>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {rental.items.length}{" "}
                {rental.items.length === 1 ? "item" : "items"} ·{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(rental.startDate))}
                {" — "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(rental.endDate))}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <p className="text-xl font-bold text-primary">
                ৳
                {Number(rental.totalAmount).toLocaleString(
                  "en-BD",
                )}
              </p>

              <Button variant="outline" size="sm" asChild>
                <Link href="/customer-dashboard/rentals">
                  Details
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