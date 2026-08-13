"use client";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/service/logout";
import type { AuthUser } from "@/types/auth";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  Loader2,
  LogOut,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DashboardHeaderProps = {
  user: AuthUser;
};

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

function getPageTitle(pathname: string) {
  const segments = pathname
    .split("/")
    .filter(Boolean);

  const lastSegment =
    segments[segments.length - 1];

  if (!lastSegment) {
    return "Dashboard";
  }

  if (
    lastSegment === "customer-dashboard" ||
    lastSegment === "provider-dashboard" ||
    lastSegment === "admin-dashboard"
  ) {
    return "Overview";
  }

  return formatSegment(lastSegment);
}

function getRoleName(
  role: AuthUser["role"],
) {
  switch (role) {
    case "CUSTOMER":
      return "Customer";

    case "PROVIDER":
      return "Provider";

    case "ADMIN":
      return "Administrator";
  }
}

function getUserInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase(),
    )
    .join("");
}

export function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const pageTitle =
    getPageTitle(pathname);

  function handleLogout() {
    startTransition(async () => {
      const result = await logout();

      if (!result.success) {
        toast.error("Logout failed", {
          description: result.message,
        });

        return;
      }

      toast.success(
        "Logged out successfully",
      );

      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center border-b bg-background/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="h-5"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>
                {getRoleName(user.role)}
              </span>

              <ChevronRight className="size-3" />

              <span className="truncate">
                {pageTitle}
              </span>
            </div>

            <h1 className="truncate text-lg font-semibold tracking-tight">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Notification */}
          {/* <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="size-4" />

            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button> */}

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border bg-background p-1.5 pr-2 transition-colors hover:bg-accent"
                aria-label="Open profile menu"
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {getUserInitials(
                      user.name,
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden max-w-36 text-left sm:block">
                  <p className="truncate text-sm font-medium leading-tight">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {getRoleName(
                      user.role,
                    )}
                  </p>
                </div>

                <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64"
            >
              {/* User info */}
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                      {getUserInitials(
                        user.name,
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {user.name}
                    </p>

                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Profile */}
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserRound className="size-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>

              {/* Home */}
              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home className="size-4" />
                  Back to Home
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                variant="destructive"
                disabled={isPending}
                onClick={handleLogout}
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}

                {isPending
                  ? "Logging out..."
                  : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}