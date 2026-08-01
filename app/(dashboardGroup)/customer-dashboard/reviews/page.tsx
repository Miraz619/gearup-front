import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyReviews } from "@/service/getMyReviews";
import {
  CalendarDays,
  MessageSquareText,
  Package,
  Star,
} from "lucide-react";
import Link from "next/link";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function CustomerReviewsPage() {
  const result = await getMyReviews();
  const reviews = result.data;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) => total + review.rating,
          0,
        ) / reviews.length
      : 0;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-100 px-6 py-8 shadow-sm dark:border-violet-900 dark:from-violet-950/30 dark:via-fuchsia-950/20 dark:to-amber-950/20 sm:px-8">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="relative">
          <Badge className="bg-violet-600 text-white hover:bg-violet-600">
            <Star className="size-3.5 fill-current" />
            Customer Feedback
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            My Reviews
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            View all reviews you submitted for returned rental equipment.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
              <MessageSquareText className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
                Total reviews
              </p>

              <p className="mt-1 text-3xl font-bold">
                {reviews.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Star className="size-5 fill-current" />
            </div>

            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Average rating
              </p>

              <p className="mt-1 text-3xl font-bold">
                {averageRating.toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {reviews.length === 0 ? (
        <Card className="border-dashed border-primary/25 bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-violet-950/20 dark:via-card dark:to-amber-950/20">
          <CardContent className="flex min-h-96 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-xl">
              <Star className="size-9" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              No reviews yet
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              After a rental is returned, you can submit a review from the My Rentals page.
            </p>

            <Button className="mt-6" asChild>
              <Link href="/customer-dashboard/rentals">
                View My Rentals
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="group overflow-hidden border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-amber-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-violet-900 dark:from-violet-950/20 dark:via-card dark:to-amber-950/10"
            >
              <CardHeader className="border-b bg-gradient-to-r from-violet-100/70 to-amber-100/50 dark:from-violet-950/30 dark:to-amber-950/20">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
                    <Package className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <CardTitle className="truncate text-lg">
                      {review.gearItem.name}
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {review.gearItem.brand}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-5">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`size-5 ${
                        value <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}

                  <span className="ml-2 font-semibold">
                    {review.rating}/5
                  </span>
                </div>

                <div className="rounded-2xl border border-violet-200/70 bg-white/70 p-4 dark:border-violet-900 dark:bg-card/70">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {review.comment || "No written comment was provided."}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  Reviewed on {formatDate(review.createdAt)}
                </div>

                <Button variant="outline" asChild>
                  <Link href={`/gear/${review.gearItemId}`}>
                    View Equipment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}