import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  RotateCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";

type PaymentPageProps = {
  searchParams: Promise<{
    success?: string;
  }>;
};

export default async function PaymentPage({
  searchParams,
}: PaymentPageProps) {
  const { success } = await searchParams;
  const isSuccessful = success === "true";

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <Card
        className={`w-full max-w-2xl overflow-hidden border shadow-xl ${
          isSuccessful
            ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:border-emerald-900 dark:from-emerald-950/30 dark:via-card dark:to-teal-950/20"
            : "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50 dark:border-rose-900 dark:from-rose-950/30 dark:via-card dark:to-orange-950/20"
        }`}
      >
        <CardContent className="px-6 py-12 text-center sm:px-12">
          <div
            className={`mx-auto flex size-20 items-center justify-center rounded-3xl text-white shadow-lg ${
              isSuccessful
                ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                : "bg-gradient-to-br from-rose-500 to-orange-500"
            }`}
          >
            {isSuccessful ? (
              <CheckCircle2 className="size-10" />
            ) : (
              <XCircle className="size-10" />
            )}
          </div>

          <Badge
            className={`mt-6 ${
              isSuccessful
                ? "bg-emerald-600 hover:bg-emerald-600"
                : "bg-rose-600 hover:bg-rose-600"
            }`}
          >
            <CreditCard className="size-3.5" />

            {isSuccessful
              ? "Payment Successful"
              : "Payment Cancelled"}
          </Badge>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            {isSuccessful
              ? "Your payment was completed"
              : "Your payment was not completed"}
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-muted-foreground">
            {isSuccessful
              ? "Stripe accepted your payment. Your rental status will be updated after the payment webhook is processed."
              : "No payment was charged. You can return to your rentals and try again whenever you are ready."}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/customer-dashboard/rentals">
                {isSuccessful ? (
                  <>
                    View My Rentals
                    <ArrowRight className="size-4" />
                  </>
                ) : (
                  <>
                    <RotateCcw className="size-4" />
                    Try Again
                  </>
                )}
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/gear">
                Browse More Gear
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}