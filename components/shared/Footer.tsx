import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Mountain } from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const exploreLinks = [
  {
    label: "Browse Gear",
    href: "/gear",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "About Us",
    href: "/about",
  },
];

const accountLinks = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Create Account",
    href: "/register",
  },
  {
    label: "Customer Dashboard",
    href: "/customer-dashboard",
  },
  {
    label: "Provider Dashboard",
    href: "/provider-dashboard",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms and Conditions",
    href: "/terms",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand information */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Mountain className="size-5" />
              </span>

              <span className="text-xl font-bold tracking-tight">
                GearUp
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Rent reliable sports and outdoor equipment from
              trusted local providers. Find the right gear for
              your next activity without purchasing everything.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {accountLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
             <Link
  href="/contact"
  className="flex items-start gap-3 transition-colors hover:text-foreground"
>
  <Mail className="mt-0.5 size-4 shrink-0" />
  <span>Contact Support</span>
</Link>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" />

                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GearUp. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}