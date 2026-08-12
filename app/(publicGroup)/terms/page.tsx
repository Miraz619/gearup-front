import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BadgeCheck,
  Ban,
  CreditCard,
  FileText,
  PackageCheck,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";

const sections = [
  {
    title: "Using GearUp",
    icon: UserRound,
    content: [
      "GearUp is an equipment rental platform that allows customers to discover and rent equipment listed by providers.",
      "Users are responsible for providing accurate account information and for using the platform in a lawful and appropriate manner.",
    ],
  },
  {
    title: "Accounts and Access",
    icon: ShieldCheck,
    content: [
      "Some GearUp features require users to create an account and sign in.",
      "Users are responsible for maintaining access to their account and should not intentionally share authentication credentials with others.",
      "GearUp may restrict access to accounts that are suspended or used in violation of platform rules.",
    ],
  },
  {
    title: "Equipment Listings",
    icon: PackageCheck,
    content: [
      "Providers are responsible for submitting accurate information about equipment listings, including availability, stock, pricing, brand, category, and description.",
      "Providers should keep listing information up to date so customers can make informed rental decisions.",
    ],
  },
  {
    title: "Rental Orders",
    icon: FileText,
    content: [
      "Customers are responsible for reviewing rental information before confirming an order.",
      "Rental status may change as an order moves through stages such as placed, confirmed, paid, picked up, returned, or cancelled.",
      "Customers and providers should follow the rental dates and information displayed in their dashboards.",
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    content: [
      "Rental payments are processed through the payment services integrated with GearUp.",
      "A rental is considered successfully paid only when the payment status is confirmed by the platform.",
      "Users should not attempt to bypass the platform's supported payment process for transactions represented on GearUp.",
    ],
  },
  {
    title: "Reviews and Feedback",
    icon: BadgeCheck,
    content: [
      "Customers may submit reviews for supported rental transactions.",
      "Reviews should reflect genuine experiences and should not contain intentionally misleading, abusive, or inappropriate content.",
    ],
  },
  {
    title: "Prohibited Use",
    icon: Ban,
    content: [
      "Users must not attempt to misuse GearUp, interfere with its operation, access another user's account without authorization, or intentionally provide fraudulent information.",
      "Platform access may be limited or suspended when misuse is identified.",
    ],
  },
  {
    title: "Platform Availability",
    icon: Wrench,
    content: [
      "GearUp may occasionally be unavailable because of maintenance, technical issues, service updates, or third-party service interruptions.",
      "Features may be improved or changed as the platform develops.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-violet-100 via-blue-50 to-emerald-100 dark:from-violet-950/30 dark:via-blue-950/20 dark:to-emerald-950/30">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Badge className="bg-primary text-primary-foreground">
            <FileText className="size-3.5" />
            Platform Guidelines
          </Badge>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            These terms explain the basic rules and
            responsibilities for using GearUp as a
            customer, provider, or administrator.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Terms content */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>
                Agreement to These Terms
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="leading-8 text-muted-foreground">
                By using GearUp, you agree to use the
                platform responsibly and follow the
                rules described on this page. These
                terms apply to the features available
                through the GearUp website and
                dashboards.
              </p>
            </CardContent>
          </Card>

          {/* Terms sections */}
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Card
                key={section.title}
                className="border-border/70"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <CardTitle className="text-xl">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {section.content.map(
                    (paragraph) => (
                      <p
                        key={paragraph}
                        className="leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Final note */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ShieldCheck className="size-5" />
                </div>

                <CardTitle>
                  Responsible Platform Use
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                GearUp is designed to make equipment
                rental easier for customers and
                providers. Responsible use of account,
                listing, rental, payment, and review
                features helps keep the platform
                reliable for everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}