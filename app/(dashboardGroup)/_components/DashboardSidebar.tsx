"use client";

import {
  adminNavItems,
  customerNavItems,
  providerNavItems,
  type DashboardNavItem,
} from "@/app/(dashboardGroup)/_config/dashboardNav";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { logout } from "@/service/logout";
import type {
  AuthUser,
  UserRole,
} from "@/types/auth";
import {
  ChevronsUpDown,
  Home,
  Loader2,
  LogOut,
  Mountain,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type DashboardSidebarProps = {
  user: AuthUser;
};

function getNavigationItems(
  role: UserRole,
): DashboardNavItem[] {
  switch (role) {
    case "CUSTOMER":
      return customerNavItems;

    case "PROVIDER":
      return providerNavItems;

    case "ADMIN":
      return adminNavItems;

    default:
      return [];
  }
}

function getRoleLabel(role: UserRole) {
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
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function DashboardSidebar({
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const navigationItems =
    getNavigationItems(user.role);

  function isActiveRoute(href: string) {
    if (pathname === href) {
      return true;
    }

    return (
      href !== "/customer-dashboard" &&
      href !== "/provider-dashboard" &&
      href !== "/admin-dashboard" &&
      pathname.startsWith(`${href}/`)
    );
  }

  function handleLogout() {
    startTransition(async () => {
      const result = await logout();

      if (!result.success) {
        toast.error("Logout failed", {
          description: result.message,
        });

        return;
      }

      toast.success("Logged out successfully");

      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <Sidebar collapsible="icon">
      {/* Brand */}
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="GearUp"
              asChild
            >
              <Link href="/">
                <span className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Mountain className="size-5" />
                </span>

                <span className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-bold">
                    GearUp
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    Gear rental platform
                  </span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Role navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {getRoleLabel(user.role)} Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(
                  item.href,
                );

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      asChild
                    >
                      <Link href={item.href}>
                        <Icon className="size-4" />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>
            Quick links
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Browse Gear"
                  asChild
                >
                  <Link href="/gear">
                    <Home className="size-4" />

                    <span>Browse Gear</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User account */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">
                      {user.name}
                    </span>

                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </span>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={8}
                className="w-64"
              >
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {user.name}
                    </p>

                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {user.email}
                    </p>

                    <p className="text-xs font-medium text-primary">
                      {getRoleLabel(user.role)}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/">
                    <Home className="size-4" />
                    Return to Home
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <UserRound className="size-4" />
                  Account Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}