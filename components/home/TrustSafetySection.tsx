import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Verified providers",
    description:
      "Gear is listed through registered provider accounts, helping customers rent from identifiable providers.",
  },
  {
    icon: CreditCard,
    title: "Secure online payment",
    description:
      "Complete rental payments through the supported online payment flow after your request is confirmed.",
  },
  {
    icon: RefreshCcw,
    title: "Clear rental tracking",
    description:
      "Follow rental progress through clear statuses from request and confirmation through completion.",
  },
  {
    icon: ShieldCheck,
    title: "Protected account access",
    description:
      "Role-based authentication keeps customer, provider, and administrative areas separated and protected.",
  },
];

export function TrustSafetySection() {
  return (
    <section className="border-b bg-muted/30 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-background shadow-sm">
          {/* Decorative glow */}
          <div className="absolute -left-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute -bottom-24 -right-20 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-12">
            {/* Left side */}
            <div className="flex flex-col justify-center">
              <Badge
                variant="secondary"
                className="w-fit"
              >
                <ShieldCheck className="mr-1 size-3.5" />
                Trust & Safety
              </Badge>

              <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Rent with more confidence
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                GearUp is designed to keep the rental journey clear and
                manageable, from finding equipment to payment and rental
                completion.
              </p>

              {/* Small trust message */}
              <div className="mt-8 flex items-start gap-3 rounded-2xl border bg-muted/40 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <p className="font-semibold">
                    Built around a clear rental process
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Customers, providers, and administrators each have
                    dedicated access and responsibilities throughout the
                    platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Right feature grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}