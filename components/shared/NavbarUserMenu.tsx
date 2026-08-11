"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { logout } from "@/service/logout";
import type { UserRole } from "@/types/auth";

import {
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type NavbarUserMenuProps = {
  name: string;
  email: string;
  role: UserRole;
};

function getDashboardHref(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "/admin-dashboard";

    case "PROVIDER":
      return "/provider-dashboard";

    default:
      return "/customer-dashboard";
  }
}

export function NavbarUserMenu({
  name,
  email,
  role,
}: NavbarUserMenuProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const dashboardHref =
    getDashboardHref(role);

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.replace("/");
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
        >
          <UserRound className="size-4" />

          <span className="max-w-28 truncate">
            {name}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuLabel>
          <p className="truncate">
            {name}
          </p>

          <p className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={dashboardHref}>
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" />

          {isPending
            ? "Logging out..."
            : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}