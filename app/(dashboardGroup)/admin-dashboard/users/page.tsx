import { UserStatusButton } from "./_components/UserStatusButton";
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
  Mail,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

function formatDate(value?: string) {
  if (!value) {
    return "Unavailable";
  }

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

export default async function AdminUsersPage() {
  const { users } = await getAdminDashboardData();

  const activeUsers = users.filter(
    (user) => user.isActive,
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.isActive,
  ).length;

  const providers = users.filter(
    (user) => user.role === "PROVIDER",
  ).length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-blue-100 via-violet-50 to-emerald-100 px-6 py-8 shadow-sm dark:from-blue-950/30 dark:via-violet-950/20 dark:to-emerald-950/30 sm:px-8">
        <div className="absolute -right-20 -top-20 size-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-52 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <Badge className="bg-primary text-primary-foreground">
            <ShieldCheck className="size-3.5" />
            Admin Management
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            User Management
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Review registered users and control their access to
            the GearUp platform.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Users className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Users
              </p>

              <p className="text-2xl font-bold">
                {users.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <UserRound className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Users
              </p>

              <p className="text-2xl font-bold">
                {activeUsers}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              <UserRound className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Inactive Users
              </p>

              <p className="text-2xl font-bold">
                {inactiveUsers}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Providers
              </p>

              <p className="text-2xl font-bold">
                {providers}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Registered Users</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="mx-auto size-12 text-muted-foreground" />

              <p className="mt-4 font-semibold">
                No users found
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Registered users will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {users.map((user) => {
                const isAdmin = user.role === "ADMIN";

                return (
                  <div
                    key={user.id}
                    className="flex flex-col gap-5 p-5 transition-colors hover:bg-muted/40 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UserRound className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">
                            {user.name}
                          </p>

                          <Badge variant="secondary">
                            {user.role}
                          </Badge>

                          <Badge
                            variant="outline"
                            className={
                              user.isActive
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            }
                          >
                            {user.isActive
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </div>

                        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-5">
                          <span className="flex items-center gap-2">
                            <Mail className="size-4" />
                            {user.email}
                          </span>

                          <span className="flex items-center gap-2">
                            <CalendarDays className="size-4" />
                            Joined {formatDate(user.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <UserStatusButton
                        userId={user.id}
                        isActive={user.isActive}
                        disabled={isAdmin}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}