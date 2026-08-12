import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import {
  ArrowRight,
  BadgeCheck,
  Search,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    icon: BadgeCheck,
    text: "Verified providers",
  },
  {
    icon: ShieldCheck,
    text: "Reliable rental process",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      {/* Hero content */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[70vh] lg:grid-cols-2 lg:px-8 lg:py-12">
        {/* Left content */}
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
            <BadgeCheck className="size-4 text-primary" />
            Smart gear rental for every adventure
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Rent the right gear.
            <span className="block text-primary">
              Enjoy every adventure.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
            Discover sports and outdoor equipment from trusted providers.
            Rent what you need, when you need it, without paying the full
            purchase price.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button size="lg" className="group" asChild>
              <Link href="/gear">
                Browse Gear
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/how-it-works">
                How It Works
              </Link>
            </Button>
          </div>

          {/* Benefits */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.text}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 text-primary" />
                  <span>{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right visual card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          whileHover={{
            y: -6,
            scale: 1.01,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 22,
            },
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />

          {/* Main card */}
          <div className="rounded-3xl border bg-background/90 p-4 shadow-2xl backdrop-blur sm:p-6">
            <div className="rounded-2xl bg-muted/50 p-5 sm:p-8">
              {/* Hero image */}
              <div className="relative mb-6 h-52 overflow-hidden rounded-2xl sm:h-60">
                <Image
                  src="/hero.jpg"
                  alt="Sports and outdoor rental gear"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Search heading */}
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                  <Search className="size-6" />
                </div>

                <div>
                  <p className="font-semibold">
                    Find your perfect gear
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Search by sport, category, or brand
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {/* Popular category */}
                <div className="rounded-xl border bg-background p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Popular category
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    Camping Equipment
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Tents, backpacks, sleeping bags and more
                  </p>
                </div>

                {/* Trending gear */}
                <div className="rounded-xl border bg-background p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Trending gear
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    Cricket Equipment
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Bats, helmets, gloves and complete kits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}