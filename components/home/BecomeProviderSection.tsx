import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UserRole } from "@/types/auth";
import { jwtUtils } from "@/utils/jwt";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  PackagePlus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

type VisitorRole = UserRole | "GUEST";

type SectionContent = {
  badge: string;
  title: string;
  description: string;
  features: string[];
  actionTitle: string;
  actionDescription: string;
  buttonText: string;
  href: string;
  secondaryText?: string;
  secondaryHref?: string;
};

async function getVisitorRole(): Promise<VisitorRole> {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const secret =
    process.env.JWT_ACCESS_SECRET;

  if (!accessToken || !secret) {
    return "GUEST";
  }

  const result = jwtUtils.verifyToken(
    accessToken,
    secret,
  );

  if (!result.success) {
    return "GUEST";
  }

  const role = result.data.role;

  if (
    role === "CUSTOMER" ||
    role === "PROVIDER" ||
    role === "ADMIN"
  ) {
    return role;
  }

  return "GUEST";
}

function getSectionContent(
  role: VisitorRole,
): SectionContent {
  switch (role) {
    case "ADMIN":
      return {
        badge: "Admin Access",
        title: "Keep GearUp running smoothly",
        description:
          "Use your admin dashboard to oversee users, gear, rentals, and platform activity.",
        features: [
          "Manage platform users",
          "Monitor gear and rentals",
          "Access administrative tools",
        ],
        actionTitle: "Admin Dashboard",
        actionDescription:
          "Continue managing the GearUp platform from your dashboard.",
        buttonText: "Go to Dashboard",
        href: "/admin-dashboard",
      };

    case "PROVIDER":
      return {
        badge: "Provider Access",
        title: "Manage your gear with ease",
        description:
          "Your provider dashboard gives you one place to manage listings and rental activity.",
        features: [
          "Manage your gear listings",
          "Review rental requests",
          "Track provider activity",
        ],
        actionTitle: "Provider Dashboard",
        actionDescription:
          "View your listings and manage incoming rental requests.",
        buttonText: "Manage My Gear",
        href: "/provider-dashboard",
      };

    case "CUSTOMER":
      return {
        badge: "Ready to Explore?",
        title: "Find the gear for your next activity",
        description:
          "Browse available sports and outdoor equipment and manage your rentals from one place.",
        features: [
          "Browse available equipment",
          "Request gear rentals",
          "Track your rental activity",
        ],
        actionTitle: "Discover More Gear",
        actionDescription:
          "Explore available equipment from GearUp providers.",
        buttonText: "Browse Gear",
        href: "/gear",
        secondaryText: "My Dashboard",
        secondaryHref: "/customer-dashboard",
      };

    default:
      return {
        badge: "For Gear Providers",
        title: "Turn unused gear into opportunity",
        description:
          "Have sports or outdoor equipment sitting unused? Join GearUp as a provider and make it available to people who need it.",
        features: [
          "Create and manage gear listings",
          "Receive rental requests",
          "Manage everything from your dashboard",
        ],
        actionTitle: "Start as a Provider",
        actionDescription:
          "Create a provider account and start listing your available equipment.",
        buttonText: "Become a Provider",
        href: "/register",
        secondaryText: "How It Works",
        secondaryHref: "/how-it-works",
      };
  }
}

export async function BecomeProviderSection() {
  const role = await getVisitorRole();
  const content = getSectionContent(role);

  return (
    <section className="border-b bg-muted/30 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left side */}
          <div className="flex flex-col justify-center">
            <Badge
              variant="secondary"
              className="w-fit"
            >
              {content.badge}
            </Badge>

            <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {content.description}
            </p>

            {/* Features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.features.map(
                (feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4" />
                    </span>

                    <span className="text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right action card */}
          <Card className="relative overflow-hidden border-primary/20 bg-background shadow-lg">
            {/* Decorative background */}
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl" />

            <CardContent className="relative flex h-full flex-col justify-between p-7 sm:p-8">
              <div>
                {/* Icon */}
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                  {role === "GUEST" ? (
                    <PackagePlus className="size-6" />
                  ) : role === "CUSTOMER" ? (
                    <Search className="size-6" />
                  ) : role ===
                    "PROVIDER" ? (
                    <LayoutDashboard className="size-6" />
                  ) : (
                    <ShieldCheck className="size-6" />
                  )}
                </div>

                <h3 className="mt-7 text-2xl font-bold tracking-tight">
                  {content.actionTitle}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {content.actionDescription}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button
                  size="lg"
                  className="group"
                  asChild
                >
                  <Link href={content.href}>
                    {content.buttonText}

                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                {content.secondaryText &&
                  content.secondaryHref && (
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                    >
                      <Link
                        href={
                          content.secondaryHref
                        }
                      >
                        {
                          content.secondaryText
                        }
                      </Link>
                    </Button>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}