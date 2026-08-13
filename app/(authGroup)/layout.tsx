import {
  ArrowLeft,
  CheckCircle2,
  Mountain,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-muted/40 px-4 py-6 sm:px-6 lg:flex lg:items-center lg:justify-center lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-3xl border bg-background shadow-xl lg:grid-cols-2">
        {/* =========================
            LEFT IMAGE PANEL
        ========================== */}
        <section className="relative hidden min-h-[760px] overflow-hidden lg:block">
          <Image
            src="/auth-sports.jpg"
            alt="Sports equipment available on GearUp"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />

          {/* Image overlays */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

          {/* Brand */}
          <div className="absolute left-10 top-10 z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-white"
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                <Mountain className="size-5" />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                GearUp
              </span>
            </Link>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-10 xl:p-12">
            <div className="max-w-lg">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                Sports gear made accessible
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                Gear up for
                <br />
                your next game.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
                Discover quality sports equipment
                from trusted providers. Rent what
                you need or list your own gear on
                one simple platform.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <CheckCircle2 className="size-4" />
                  Easy rentals
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <CheckCircle2 className="size-4" />
                  Trusted providers
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <CheckCircle2 className="size-4" />
                  Secure payments
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            RIGHT FORM PANEL
        ========================== */}
        <section className="flex min-h-[760px] flex-col bg-background">
          {/* Top header */}
          <header className="flex items-center justify-between px-6 py-6 sm:px-8 lg:px-10 xl:px-12">
            {/* Mobile brand */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 lg:hidden"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Mountain className="size-5" />
              </span>

              <span className="text-xl font-bold tracking-tight">
                GearUp
              </span>
            </Link>

            <div className="hidden lg:block" />

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </header>

          {/* Form area */}
          <div className="flex flex-1 items-center justify-center px-6 py-6 sm:px-8 lg:px-10 xl:px-12">
            <div
              className="
                w-full
                max-w-xl
                [&>*]:!w-full
                [&>*]:!max-w-none
              "
            >
              {children}
            </div>
          </div>

          {/* Bottom footer */}
          <footer className="px-6 pb-6 text-center text-xs text-muted-foreground">
            © 2026 GearUp. Sports equipment rental made simple.
          </footer>
        </section>
      </div>
    </main>
  );
}