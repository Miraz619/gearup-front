import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminDashboardData } from "@/service/getAdminDashboardData";
import {
  Boxes,
  ClipboardList,
  ShieldCheck,
  Users,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const { users, gear, rentals } =
    await getAdminDashboardData();

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      description: "Registered customers, providers, and admins",
      icon: Users,
    },
    {
      title: "Total Gear",
      value: gear.length.toString(),
      description: "Equipment listed across the platform",
      icon: Boxes,
    },
    {
      title: "Total Rentals",
      value: rentals.length.toString(),
      description: "Rental orders across the platform",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-violet-100 via-blue-50 to-emerald-100 px-6 py-8 shadow-sm dark:from-violet-950/30 dark:via-blue-950/20 dark:to-emerald-950/30 sm:px-8">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <Badge className="bg-primary text-primary-foreground">
            <ShieldCheck className="size-3.5" />
            Admin Control Center
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Monitor users, equipment listings, rental activity, and platform
            operations from one dashboard.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="overflow-hidden border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-semibold">
                  {item.title}
                </CardTitle>

                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">
                  {item.value}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}