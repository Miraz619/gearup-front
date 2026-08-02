import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  PackageCheck,
  Search,
  ShieldCheck,
  Star,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";

const customerSteps = [
  {
    number: "01",
    title: "Browse available gear",
    description:
      "Explore sports and outdoor equipment, compare prices, check availability, and open the gear details page.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose dates and quantity",
    description:
      "Select your rental start date, end date, and required quantity before submitting the order.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Wait for confirmation",
    description:
      "The provider reviews your rental request and confirms it when the equipment is available.",
    icon: UserRoundCheck,
  },
  {
    number: "04",
    title: "Pay securely",
    description:
      "Complete the payment through Stripe Checkout after the provider confirms your rental.",
    icon: CreditCard,
  },
  {
    number: "05",
    title: "Pick up and return",
    description:
      "Collect the equipment, use it during the rental period, and return it to the provider.",
    icon: PackageCheck,
  },
  {
    number: "06",
    title: "Share your review",
    description:
      "After the rental is returned, submit a rating and comment about your experience.",
    icon: Star,
  },
];

const providerSteps = [
  "Create and manage equipment listings",
  "Update stock, pricing, and availability",
  "Review incoming rental requests",
  "Confirm or cancel customer orders",
  "Mark paid orders as picked up",
  "Complete the order after equipment return",
  "Monitor earnings and rental activity",
];

const statuses = [
  {
    status: "PLACED",
    description:
      "The customer has submitted a new rental request.",
  },
  {
    status: "CONFIRMED",
    description:
      "The provider has approved the rental request.",
  },
  {
    status: "PAID",
    description:
      "The customer has completed the Stripe payment.",
  },
  {
    status: "PICKED UP",
    description:
      "The customer has received the rented equipment.",
  },
  {
    status: "RETURNED",
    description:
      "The equipment has been returned and the rental is complete.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-100 dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-emerald-950/30">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 size-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="container relative mx-auto px-4 py-20 text-center lg:py-28">
          <Badge className="bg-blue-600 text-white hover:bg-blue-600">
            <ShieldCheck className="size-3.5" />
            Simple and Secure Rental Process
          </Badge>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How GearUp Works
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            GearUp connects customers with equipment providers
            through a simple rental process covering booking,
            confirmation, payment, pickup, return, and review.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/gear">
                Browse Gear
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/register">
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary">
            Customer Journey
          </Badge>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Rent equipment in six simple steps
          </h2>

          <p className="mt-4 leading-8 text-muted-foreground">
            Every step is designed to make equipment rental clear,
            secure, and easy to track.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {customerSteps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.number}
                className="group overflow-hidden border-primary/15 bg-gradient-to-br from-primary/5 via-card to-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>

                    <span className="text-4xl font-black text-primary/10">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              For Equipment Providers
            </Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Turn your equipment into rental income
            </h2>

            <p className="mt-4 max-w-xl leading-8 text-muted-foreground">
              Providers can create equipment listings, manage
              inventory, process rental orders, and monitor
              earnings from one dashboard.
            </p>

            <Button className="mt-7" size="lg" asChild>
              <Link href="/register">
                Become a Provider
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 via-white to-cyan-50 shadow-xl dark:border-emerald-900 dark:from-emerald-950/30 dark:via-card dark:to-cyan-950/20">
            <CardHeader>
              <CardTitle>
                Provider workflow
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {providerSteps.map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl border bg-background/70 p-4"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />

                  <p className="text-sm font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary">
            Rental Status
          </Badge>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Track every stage of your rental
          </h2>

          <p className="mt-4 leading-8 text-muted-foreground">
            Customers and providers can follow the rental status
            from initial booking to final return.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {statuses.map((item, index) => (
            <div
              key={item.status}
              className="relative"
            >
              <Card className="h-full border-primary/15 bg-gradient-to-br from-blue-50 via-card to-emerald-50 dark:from-blue-950/20 dark:via-card dark:to-emerald-950/20">
                <CardContent className="p-5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>

                  <h3 className="mt-5 font-bold">
                    {item.status}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>

              {index < statuses.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-primary lg:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-violet-100 via-blue-50 to-emerald-100 dark:from-violet-950/30 dark:via-blue-950/20 dark:to-emerald-950/30">
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
              <PackageCheck className="size-8" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Start your next rental today
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
              Find the equipment you need, choose your rental
              dates, and complete the entire process through
              GearUp.
            </p>

            <Button size="lg" className="mt-7" asChild>
              <Link href="/gear">
                Explore Available Gear
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}