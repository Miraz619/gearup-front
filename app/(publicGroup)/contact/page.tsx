import { ContactForm } from "@/app/(publicGroup)/_components/ContactForm";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-100 dark:from-blue-950/30 dark:via-cyan-950/20 dark:to-emerald-950/30">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Badge className="bg-primary text-primary-foreground">
            <MessageSquareText className="size-3.5" />
            Contact GearUp
          </Badge>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            How Can We Help?
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Have a question about rentals,
            equipment listings, payments, or
            your GearUp account? Send us a
            message and we&apos;ll be happy to
            hear from you.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        {/* Left information */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary">
              Support
            </Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Get in Touch
            </h2>

            <p className="mt-3 max-w-lg leading-7 text-muted-foreground">
              Use the contact form for
              questions about using GearUp,
              rentals, provider listings,
              payments, or general platform
              support.
            </p>
          </div>

          {/* Email */}
          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Email Support
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Send your message through
                  the form and it will be
                  stored securely for review.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Support Requests
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  You can submit a contact
                  request at any time through
                  the GearUp website.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Platform */}
          <Card>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>

              <div>
                <p className="font-semibold">
                  GearUp Platform
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Equipment rental support
                  for customers and providers
                  using the GearUp platform.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security note */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex items-start gap-4 p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

              <p className="text-sm leading-6 text-muted-foreground">
                Please do not include passwords,
                payment-card details, or other
                sensitive credentials in your
                message.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact form */}
        <Card className="h-fit shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">
              Send a Message
            </CardTitle>

            <p className="text-sm leading-6 text-muted-foreground">
              Complete the form below and
              provide enough information for
              us to understand your question.
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <ContactForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}