import { Badge } from "@/components/ui/badge";
import { ChevronDown, CircleHelp } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is GearUp?",
    answer:
      "GearUp is a rental platform where customers can explore sports and outdoor equipment offered by registered providers.",
  },
  {
    question: "How do I rent equipment?",
    answer:
      "Browse the available gear, open the item details, choose your rental information, and submit a rental request to the provider.",
  },
  {
    question: "When do I make the payment?",
    answer:
      "After your rental request is confirmed, you can complete the payment online through the available payment process.",
  },
  {
    question: "Can I list my own equipment?",
    answer:
      "Yes. You can register with a provider account and use the provider dashboard to create and manage your gear listings.",
  },
  {
    question: "Where can I manage my rentals?",
    answer:
      "After signing in, customers can use their dashboard to view and manage their rental activity.",
  },
];

export function FAQSection() {
  return (
    <section className="border-b py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left side */}
          <div>
            <Badge variant="secondary">
              <CircleHelp className="mr-1 size-3.5" />
              FAQ
            </Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Questions about renting with GearUp?
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
              Find quick answers to some of the most common questions about
              renting and providing equipment on GearUp.
            </p>

            <p className="mt-6 text-sm text-muted-foreground">
              Want to understand the full rental process?{" "}
              <Link
                href="/how-it-works"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                See how GearUp works
              </Link>
            </p>
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border bg-card px-5 shadow-sm transition-shadow open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <div className="border-t pb-5 pt-4">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}