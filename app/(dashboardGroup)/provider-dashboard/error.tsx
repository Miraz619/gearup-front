"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Home,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type ProviderDashboardErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ProviderDashboardError({
  error,
  reset,
}: ProviderDashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-xl overflow-hidden border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50 shadow-xl dark:border-rose-900 dark:from-rose-950/30 dark:via-card dark:to-orange-950/20">
        <CardContent className="px-6 py-12 text-center sm:px-10">
          <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg">
            <AlertTriangle className="size-10" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Unable to load provider dashboard
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            We could not load your gear or rental-order information.
            Please try again.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" onClick={reset}>
              <RefreshCcw className="size-4" />
              Try Again
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="size-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}