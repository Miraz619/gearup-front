import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Cookie,
  Database,
  Eye,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    icon: Database,
    content: [
      "When you create a GearUp account, we may collect information such as your name and email address.",
      "We also store information related to rental orders, equipment listings, payments, and reviews when you use those features.",
    ],
  },
  {
    title: "How We Use Information",
    icon: UserRound,
    content: [
      "Account information is used to provide authentication and role-based access to GearUp.",
      "Rental and payment information is used to support equipment bookings, payment processing, rental tracking, and dashboard functionality.",
    ],
  },
  {
    title: "Authentication and Security",
    icon: LockKeyhole,
    content: [
      "GearUp uses secure authentication methods to protect account access.",
      "Passwords are handled securely by the backend, and authentication tokens are used to maintain logged-in sessions.",
      "Google Sign-In may also be used as an authentication option.",
    ],
  },
  {
    title: "Payments",
    icon: ShieldCheck,
    content: [
      "GearUp uses Stripe Checkout to process online rental payments.",
      "Sensitive payment-card information is handled by the payment provider rather than being stored directly by GearUp.",
    ],
  },
  {
    title: "Cookies",
    icon: Cookie,
    content: [
      "GearUp uses authentication cookies to keep users signed in and provide access to protected dashboard features.",
      "These cookies are used for application functionality rather than advertising.",
    ],
  },
  {
    title: "Your Information",
    icon: Eye,
    content: [
      "Users can view their account information from their dashboard profile.",
      "Users can update supported profile information through the Profile page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-emerald-100 via-cyan-50 to-blue-100 dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-blue-950/30">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Badge className="bg-primary text-primary-foreground">
            <ShieldCheck className="size-3.5" />
            Privacy & Security
          </Badge>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            This page explains how GearUp handles
            information used to provide accounts,
            rentals, payments, reviews, and other
            platform features.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>
                Our Approach to Privacy
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="leading-8 text-muted-foreground">
                GearUp is an equipment rental platform
                designed to connect customers with
                providers. We only use information
                needed to support the features and
                services available through the
                application.
              </p>
            </CardContent>
          </Card>

          {/* Privacy sections */}
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

          {/* Contact */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Mail className="size-5" />
                </div>

                <CardTitle>
                  Privacy Questions
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                If you have questions about privacy or
                how information is handled on GearUp,
                please use the contact information
                provided in the website footer.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}