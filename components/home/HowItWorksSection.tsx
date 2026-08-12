import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Search,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Find the right gear",
    description:
      "Browse available sports and outdoor equipment and choose what fits your needs.",
    icon: Search,
  },
  {
    number: "02",
    title: "Request your rental",
    description:
      "Choose your rental dates and quantity, then send the request to the provider.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Confirm & pay",
    description:
      "After provider confirmation, complete your payment securely and get ready for your rental.",
    icon: CreditCard,
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-b bg-muted/30 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">
            How It Works
          </Badge>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Rent gear in a few simple steps
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            GearUp makes finding and renting equipment simple,
            clear, and secure.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.number}
                className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            className="group"
            asChild
          >
            <Link href="/how-it-works">
              See How GearUp Works

              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}