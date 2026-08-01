import { Mountain } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-muted/30">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-muted/40" />

      <div className="absolute -left-32 top-20 -z-10 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute -right-32 bottom-20 -z-10 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Mountain className="size-5" />
            </span>

            <span className="text-xl font-bold tracking-tight">
              GearUp
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          {children}
        </div>
      </div>
    </main>
  );
}