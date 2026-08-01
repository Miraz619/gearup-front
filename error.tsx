"use client";

import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          We could not display this page. Please try again.
        </p>

        {error.digest && (
          <p className="mt-2 text-xs text-muted-foreground">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Try again
          </button>

          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Go home
          </button>
        </div>
      </div>
    </main>
  );
}