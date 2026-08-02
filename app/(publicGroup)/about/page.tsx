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
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Easy equipment rental",
    description:
      "Customers can browse available gear, choose rental dates, and place orders through a simple rental process.",
    icon: PackageSearch,
  },
  {
    title: "Trusted providers",
    description:
      "Providers can list equipment, manage inventory, confirm orders, and update rental progress.",
    icon: Users,
  },
  {
    title: "Secure payments",
    description:
      "GearUp uses Stripe Checkout for safe and reliable online rental payments.",
    icon: ShieldCheck,
  },
  {
    title: "Verified reviews",
    description:
      "Customers can review equipment after completing and returning their rental.",
    icon: Star,
  },
];

const steps = [
  "Browse sports and outdoor equipment",
  "Choose rental dates and quantity",
  "Wait for provider confirmation",
  "Complete payment securely",
  "Pick up, use, and return the equipment",
];

export default function AboutPage() {
  return (
    <main className="space-y-20 pb-20">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30">
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 size-72 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="container relative mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <Badge className="bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
              About GearUp
            </Badge>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Rent the gear you need without buying everything.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              GearUp is a sports and outdoor equipment rental
              platform that connects customers with trusted local
              providers. It makes equipment rental simple,
              affordable, and accessible.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/gear">
                  Browse Available Gear
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/register">
                  Create an Account
                </Link>
              </Button>
            </div>
          </div>

          <Card className="border-primary/20 bg-white/80 shadow-xl backdrop-blur dark:bg-card/80">
            <CardHeader>
              <CardTitle className="text-2xl">
                How GearUp works
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border bg-background/70 p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>

                  <p className="pt-1 text-sm font-medium leading-6">
                    {step}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary">
            Our Purpose
          </Badge>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Making equipment more accessible
          </h2>

          <p className="mt-4 leading-8 text-muted-foreground">
            Many people need sports and outdoor equipment only for
            a short time. GearUp helps customers avoid unnecessary
            purchases while allowing providers to earn from
            equipment they already own.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group border-primary/15 bg-gradient-to-br from-primary/5 via-card to-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30">
          <CardContent className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                Why Choose GearUp
              </Badge>

              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                A complete rental experience
              </h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                GearUp supports the complete equipment-rental
                lifecycle, from discovering gear to payment,
                pickup, return, and customer feedback.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Role-based customer and provider dashboards",
                "Real-time rental status tracking",
                "Secure Stripe Checkout payments",
                "Equipment inventory management",
                "Review system for completed rentals",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border bg-white/70 p-4 dark:bg-card/70"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />

                  <span className="text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to find the right gear?
          </h2>

          <p className="mt-4 leading-8 text-muted-foreground">
            Browse available equipment and start your next rental
            with GearUp.
          </p>

          <Button size="lg" className="mt-7" asChild>
            <Link href="/gear">
              Explore Gear
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}