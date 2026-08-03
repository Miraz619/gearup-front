"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-sm">

        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-7" />
        </div>

        <h2 className="mt-5 text-xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-3 text-sm text-muted-foreground">
          We could not complete your request.
          Please try again.
        </p>

        <Button
          onClick={reset}
          className="mt-6"
        >
          Try Again
        </Button>

      </div>
    </div>
  );
}