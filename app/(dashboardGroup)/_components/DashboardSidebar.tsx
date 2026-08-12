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

import type {
  AuthUser,
  UserRole,
} from "@/types/auth";

import {
  Mountain,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

function getRoleLabel(
  role: UserRole,
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

function getUserInitials(
  name: string,
) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase(),
    )
    .join("");
}

export function DashboardSidebar({
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigationItems =
    getNavigationItems(user.role);

  function isActiveRoute(
    href: string,
  ) {
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
              {navigationItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const isActive =
                    isActiveRoute(
                      item.href,
                    );

                  return (
                    <SidebarMenuItem
                      key={
                        item.href
                      }
                    >
                      <SidebarMenuButton
                        tooltip={
                          item.title
                        }
                        isActive={
                          isActive
                        }
                        asChild
                      >
                        <Link
                          href={
                            item.href
                          }
                        >
                          <Icon className="size-4" />

                          <span>
                            {
                              item.title
                            }
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                },
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logged-in user */}
      <SidebarFooter className="border-t">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="size-9 rounded-lg">
            <AvatarFallback className="rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {getUserInitials(
                user.name,
              )}
            </AvatarFallback>
          </Avatar>

          <div className="grid min-w-0 flex-1 leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium">
              {user.name}
            </span>

            <span className="truncate text-xs text-muted-foreground">
              {getRoleLabel(
                user.role,
              )}
            </span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}