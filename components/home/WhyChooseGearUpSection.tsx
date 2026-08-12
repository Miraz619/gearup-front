import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Boxes,
  CreditCard,
  LayoutDashboard,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    title: "Wide range of gear",
    description:
      "Explore sports and outdoor equipment across multiple categories in one place.",
    icon: Boxes,
  },
  {
    title: "Simple rental process",
    description:
      "Choose your gear, select your rental period, and manage the process with clear rental statuses.",
    icon: RefreshCcw,
  },
  {
    title: "Online payment",
    description:
      "Complete your rental payment online after your request has been confirmed.",
    icon: CreditCard,
  },
  {
    title: "Role-based dashboards",
    description:
      "Customers and providers get dedicated dashboards to manage rentals, listings, and activities.",
    icon: LayoutDashboard,
  },
];

export function WhyChooseGearUpSection() {
  return (
    <section className="border-b py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">
            Why GearUp
          </Badge>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            A simpler way to access the gear you need
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            GearUp connects customers with equipment providers through a
            straightforward rental experience.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}