import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const result = await getMe();

  if (
    !result.success ||
    !result.data ||
    result.data.role !== "CUSTOMER"
  ) {
    redirect("/login");
  }

  const user = result.data;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
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

      {/* Account information */}
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

      {/* Quick actions */}
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

      {/* Rental summary placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Rental overview</CardTitle>

          <CardDescription>
            Your active, completed, and pending rental
            information will appear here after we connect the
            customer rental-history endpoint.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border border-dashed bg-muted/30 px-5 py-10 text-center">
            <CalendarDays className="mx-auto size-10 text-muted-foreground" />

            <p className="mt-4 font-medium">
              Rental data is not connected yet
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We will replace this state with real API data rather
              than displaying invented statistics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}