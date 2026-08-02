import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowLeft,
  LayoutDashboard,
  SearchX,
} from "lucide-react";
import Link from "next/link";

export default function CustomerDashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-xl overflow-hidden border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 shadow-xl dark:border-violet-900 dark:from-violet-950/30 dark:via-card dark:to-blue-950/20">
        <CardContent className="px-6 py-12 text-center sm:px-10">
          <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg">
            <SearchX className="size-10" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Error 404
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Customer page not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            The customer dashboard page you requested does not
            exist or may have been moved.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/customer-dashboard">
                <LayoutDashboard className="size-4" />
                Customer Dashboard
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/customer-dashboard/rentals">
                <ArrowLeft className="size-4" />
                My Rentals
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}