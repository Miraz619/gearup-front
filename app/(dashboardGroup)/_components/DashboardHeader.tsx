"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { AuthUser } from "@/types/auth";
import { Bell, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

type DashboardHeaderProps = {
  user: AuthUser;
};

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
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

function getRoleName(role: AuthUser["role"]) {
  switch (role) {
    case "CUSTOMER":
      return "Customer";
    case "PROVIDER":
      return "Provider";
    case "ADMIN":
      return "Administrator";
  }
}

export function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

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
              <span>{getRoleName(user.role)}</span>

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
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="size-4" />

            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button>

          <div className="hidden text-right sm:block">
            <p className="max-w-40 truncate text-sm font-medium">
              {user.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {getRoleName(user.role)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}