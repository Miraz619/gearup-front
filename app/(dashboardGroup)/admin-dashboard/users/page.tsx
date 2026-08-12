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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAdminDashboardData } from "@/service/getAdminDashboardData";

import {
  ChevronLeft,
  ChevronRight,
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

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function formatRole(role: string) {
  switch (role) {
    case "CUSTOMER":
      return "Customer";

    case "PROVIDER":
      return "Provider";

    case "ADMIN":
      return "Admin";

    default:
      return role;
  }
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
  const params =
    new URLSearchParams();

  if (search) {
    params.set(
      "search",
      search,
    );
  }

  if (
    role &&
    role !== "ALL"
  ) {
    params.set(
      "role",
      role,
    );
  }

  if (
    status &&
    status !== "ALL"
  ) {
    params.set(
      "status",
      status,
    );
  }

  params.set(
    "page",
    page.toString(),
  );

  return `/admin-dashboard/users?${params.toString()}`;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const params =
    await searchParams;

  const { users } =
    await getAdminDashboardData();

  const search =
    params.search?.trim() || "";

  const role =
    params.role || "ALL";

  const status =
    params.status || "ALL";

  const requestedPage =
    Number(
      params.page || "1",
    );

  const currentPage =
    Number.isInteger(
      requestedPage,
    ) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  /*
   * Dashboard statistics
   */

  const activeUsers =
    users.filter(
      (user) =>
        user.isActive,
    ).length;

  const inactiveUsers =
    users.filter(
      (user) =>
        !user.isActive,
    ).length;

  const providers =
    users.filter(
      (user) =>
        user.role ===
        "PROVIDER",
    ).length;

  /*
   * Search and filtering
   */

  const filteredUsers =
    users.filter((user) => {
      const normalizedSearch =
        search.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        user.name
          .toLowerCase()
          .includes(
            normalizedSearch,
          ) ||
        user.email
          .toLowerCase()
          .includes(
            normalizedSearch,
          );

      const matchesRole =
        role === "ALL" ||
        user.role === role;

      const matchesStatus =
        status === "ALL" ||
        (status ===
          "ACTIVE" &&
          user.isActive) ||
        (status ===
          "INACTIVE" &&
          !user.isActive);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });

  /*
   * Pagination
   */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredUsers.length /
          USERS_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage -
      1) *
    USERS_PER_PAGE;

  const paginatedUsers =
    filteredUsers.slice(
      startIndex,
      startIndex +
        USERS_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    role !== "ALL" ||
    status !== "ALL";

  return (
    <div className="space-y-8">
      {/* Page heading */}
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
            Search registered
            users, filter
            accounts, and control
            access to the GearUp
            platform.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total users */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
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

        {/* Active users */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
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

        {/* Inactive users */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
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

        {/* Providers */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
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

      {/* Search and filters */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Search and Filter Users
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/admin-dashboard/users"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="user-search"
                className="sr-only"
              >
                Search users
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="user-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search by name or email"
                className="pl-9"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role-filter"
                className="sr-only"
              >
                Filter by role
              </label>

              <select
                id="role-filter"
                name="role"
                defaultValue={
                  role
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All roles
                </option>

                <option value="CUSTOMER">
                  Customers
                </option>

                <option value="PROVIDER">
                  Providers
                </option>

                <option value="ADMIN">
                  Admins
                </option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status-filter"
                className="sr-only"
              >
                Filter by status
              </label>

              <select
                id="status-filter"
                name="status"
                defaultValue={
                  status
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All statuses
                </option>

                <option value="ACTIVE">
                  Active
                </option>

                <option value="INACTIVE">
                  Inactive
                </option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button type="submit">
                <Search className="size-4" />
                Apply
              </Button>

              {hasFilters && (
                <Button
                  variant="outline"
                  asChild
                >
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

      {/* Users data table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              Registered Users
            </CardTitle>

            <Badge variant="secondary">
              {filteredUsers.length}{" "}
              {filteredUsers.length ===
              1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedUsers.length ===
          0 ? (
            /* Empty state */
            <div className="py-16 text-center">
              <Users className="mx-auto size-12 text-muted-foreground" />

              <p className="mt-4 font-semibold">
                No matching users
                found
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Try changing the
                search text or
                selected filters.
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
            /* Real data table */
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[190px]">
                    User
                  </TableHead>

                  <TableHead className="min-w-[220px]">
                    Email
                  </TableHead>

                  <TableHead>
                    Role
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    Joined
                  </TableHead>

                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUsers.map(
                  (user) => {
                    const isAdmin =
                      user.role ===
                      "ADMIN";

                    return (
                      <TableRow
                        key={
                          user.id
                        }
                      >
                        {/* User */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <UserRound className="size-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[170px] truncate font-medium">
                                {
                                  user.name
                                }
                              </p>

                              <p className="text-xs text-muted-foreground">
                                GearUp
                                account
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Email */}
                        <TableCell>
                          <span className="block max-w-[220px] truncate text-sm text-muted-foreground">
                            {
                              user.email
                            }
                          </span>
                        </TableCell>

                        {/* Role */}
                        <TableCell>
                          <Badge variant="secondary">
                            {formatRole(
                              user.role,
                            )}
                          </Badge>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
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
                        </TableCell>

                        {/* Joined */}
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(
                            user.createdAt,
                          )}
                        </TableCell>

                        {/* Action */}
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <UserStatusButton
                              userId={
                                user.id
                              }
                              isActive={
                                user.isActive
                              }
                              disabled={
                                isAdmin
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredUsers.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  USERS_PER_PAGE,
                filteredUsers.length,
              )}{" "}
              of{" "}
              {
                filteredUsers.length
              }{" "}
              users
            </p>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <Button
                variant="outline"
                size="sm"
                disabled={
                  safeCurrentPage ===
                  1
                }
                asChild={
                  safeCurrentPage !==
                  1
                }
              >
                {safeCurrentPage ===
                1 ? (
                  <>
                    <ChevronLeft className="size-4" />
                    Previous
                  </>
                ) : (
                  <Link
                    href={createPageUrl(
                      {
                        page:
                          safeCurrentPage -
                          1,
                        search,
                        role,
                        status,
                      },
                    )}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Link>
                )}
              </Button>

              {/* Current page */}
              <Badge variant="outline">
                Page{" "}
                {safeCurrentPage}{" "}
                of {totalPages}
              </Badge>

              {/* Next */}
              <Button
                variant="outline"
                size="sm"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                asChild={
                  safeCurrentPage !==
                  totalPages
                }
              >
                {safeCurrentPage ===
                totalPages ? (
                  <>
                    Next
                    <ChevronRight className="size-4" />
                  </>
                ) : (
                  <Link
                    href={createPageUrl(
                      {
                        page:
                          safeCurrentPage +
                          1,
                        search,
                        role,
                        status,
                      },
                    )}
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