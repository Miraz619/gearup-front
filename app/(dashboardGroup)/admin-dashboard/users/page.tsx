import { UserStatusButton } from "./_components/UserStatusButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAdminDashboardData } from "@/service/getAdminDashboardData";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

type AdminUsersPageProps = {
  searchParams: Promise<{
    search?: string;
    role?: string;
    status?: string;
    page?: string;
  }>;
};

const USERS_PER_PAGE = 6;

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

function createPageUrl({
  page,
  search,
  role,
  status,
}: {
  page: number;
  search: string;
  role: string;
  status: string;
}) {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (role && role !== "ALL") {
    params.set("role", role);
  }

  if (status && status !== "ALL") {
    params.set("status", status);
  }

  params.set("page", page.toString());

  return `/admin-dashboard/users?${params.toString()}`;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const params = await searchParams;
  const { users } = await getAdminDashboardData();

  const search = params.search?.trim() || "";
  const role = params.role || "ALL";
  const status = params.status || "ALL";

  const requestedPage = Number(params.page || "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const activeUsers = users.filter(
    (user) => user.isActive,
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.isActive,
  ).length;

  const providers = users.filter(
    (user) => user.role === "PROVIDER",
  ).length;

  const filteredUsers = users.filter((user) => {
    const normalizedSearch = search.toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch);

    const matchesRole =
      role === "ALL" || user.role === role;

    const matchesStatus =
      status === "ALL" ||
      (status === "ACTIVE" && user.isActive) ||
      (status === "INACTIVE" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const startIndex =
    (safeCurrentPage - 1) * USERS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  );

  const hasFilters =
    Boolean(search) ||
    role !== "ALL" ||
    status !== "ALL";

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
            Search registered users, filter accounts, and control
            access to the GearUp platform.
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

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Search and Filter Users</CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/admin-dashboard/users"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                name="search"
                defaultValue={search}
                placeholder="Search by name or email"
                className="pl-9"
              />
            </div>

            <select
              name="role"
              defaultValue={role}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="ALL">All roles</option>
              <option value="CUSTOMER">Customers</option>
              <option value="PROVIDER">Providers</option>
              <option value="ADMIN">Admins</option>
            </select>

            <select
              name="status"
              defaultValue={status}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <div className="flex gap-2">
              <Button type="submit">
                <Search className="size-4" />
                Apply
              </Button>

              {hasFilters && (
                <Button variant="outline" asChild>
                  <Link href="/admin-dashboard/users">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Registered Users</CardTitle>

            <Badge variant="secondary">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedUsers.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="mx-auto size-12 text-muted-foreground" />

              <p className="mt-4 font-semibold">
                No matching users found
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Try changing the search text or selected filters.
              </p>

              {hasFilters && (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/admin-dashboard/users">
                    Clear Filters
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y">
              {paginatedUsers.map((user) => {
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

      {filteredUsers.length > 0 && totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}–
            {Math.min(
              startIndex + USERS_PER_PAGE,
              filteredUsers.length,
            )}{" "}
            of {filteredUsers.length} users
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={safeCurrentPage === 1}
              asChild={safeCurrentPage !== 1}
            >
              {safeCurrentPage === 1 ? (
                <>
                  <ChevronLeft className="size-4" />
                  Previous
                </>
              ) : (
                <Link
                  href={createPageUrl({
                    page: safeCurrentPage - 1,
                    search,
                    role,
                    status,
                  })}
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Link>
              )}
            </Button>

            <Badge variant="outline">
              Page {safeCurrentPage} of {totalPages}
            </Badge>

            <Button
              variant="outline"
              size="sm"
              disabled={safeCurrentPage === totalPages}
              asChild={safeCurrentPage !== totalPages}
            >
              {safeCurrentPage === totalPages ? (
                <>
                  Next
                  <ChevronRight className="size-4" />
                </>
              ) : (
                <Link
                  href={createPageUrl({
                    page: safeCurrentPage + 1,
                    search,
                    role,
                    status,
                  })}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Link>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}