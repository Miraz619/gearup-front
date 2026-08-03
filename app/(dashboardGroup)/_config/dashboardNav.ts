import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  Boxes,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  PackagePlus,
  Settings,
  ShieldCheck,
  Star,
  Tags,
  Users,
} from "lucide-react";

export type DashboardNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const customerNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    href: "/customer-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Rentals",
    href: "/customer-dashboard/rentals",
    icon: ClipboardList,
  },
  {
    title: "Payments",
    href: "/customer-dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "My Reviews",
    href: "/customer-dashboard/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/customer-dashboard/settings",
    icon: Settings,
  },
];

export const providerNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Gear",
    href: "/provider-dashboard/gear",
    icon: Boxes,
  },
  {
    title: "Add Gear",
    href: "/provider-dashboard/gear/create",
    icon: PackagePlus,
  },
  {
    title: "Rental Orders",
    href: "/provider-dashboard/orders",
    icon: ClipboardList,
  },
  {
    title: "Earnings",
    href: "/provider-dashboard/earnings",
    icon: BadgeDollarSign,
  },
  {
    title: "Settings",
    href: "/provider-dashboard/settings",
    icon: Settings,
  },
];

export const adminNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Gear Management",
    href: "/admin-dashboard/gear",
    icon: Boxes,
  },
  {
    title: "Categories",
    href: "/admin-dashboard/categories",
    icon: Tags,
  },
  {
    title: "Rental Orders",
    href: "/admin-dashboard/rentals",
    icon: ClipboardList,
  },
];