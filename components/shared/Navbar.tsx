import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import Link from "next/link";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Browse Gear",
    href: "/gear",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Mountain className="size-5" />
          </span>

          <span className="text-xl font-bold tracking-tight">
            GearUp
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
            >
              <Link href={item.href}>
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Desktop authentication buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            asChild
          >
            <Link href="/login">
              Login
            </Link>
          </Button>

          <Button asChild>
            <Link href="/register">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px]"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Mountain className="size-5" />
                  </span>

                  GearUp
                </SheetTitle>

                <SheetDescription>
                  Rent sports and outdoor gear from
                  trusted providers.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-2 px-4">
                {navLinks.map((item) => (
                  <SheetClose
                    key={item.href}
                    asChild
                  >
                    <Button
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </Button>
                  </SheetClose>
                ))}

                <div className="my-4 border-t" />

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    asChild
                  >
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button asChild>
                    <Link href="/register">
                      Get Started
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}