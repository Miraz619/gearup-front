import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMyReviews } from "@/service/getMyReviews";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquareText,
  Package,
  Search,
  Star,
  X,
} from "lucide-react";

import Link from "next/link";

type CustomerReviewsPageProps = {
  searchParams: Promise<{
    search?: string;
    rating?: string;
    page?: string;
  }>;
};

const REVIEWS_PER_PAGE = 6;

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function createPageUrl({
  page,
  search,
  rating,
}: {
  page: number;
  search: string;
  rating: string;
}) {
  const params =
    new URLSearchParams();

  if (search) {
    params.set(
      "search",
      search,
    );
  }

  if (
    rating &&
    rating !== "ALL"
  ) {
    params.set(
      "rating",
      rating,
    );
  }

  params.set(
    "page",
    page.toString(),
  );

  return `/customer-dashboard/reviews?${params.toString()}`;
}

export default async function CustomerReviewsPage({
  searchParams,
}: CustomerReviewsPageProps) {
  const params =
    await searchParams;

  const result =
    await getMyReviews();

  const reviews =
    result.data;

  const search =
    params.search?.trim() ||
    "";

  const rating =
    params.rating || "ALL";

  const requestedPage =
    Number(
      params.page || "1",
    );

  const currentPage =
    Number.isInteger(
      requestedPage,
    ) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  /*
   * Statistics
   */

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (
            total,
            review,
          ) =>
            total +
            review.rating,
          0,
        ) / reviews.length
      : 0;

  const fiveStarReviews =
    reviews.filter(
      (review) =>
        review.rating === 5,
    ).length;

  /*
   * Search and filtering
   */

  const filteredReviews =
    reviews.filter(
      (review) => {
        const normalizedSearch =
          search.toLowerCase();

        const comment =
          review.comment ?? "";

        const matchesSearch =
          !normalizedSearch ||
          review.gearItem.name
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          review.gearItem.brand
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          comment
            .toLowerCase()
            .includes(
              normalizedSearch,
            );

        const matchesRating =
          rating === "ALL" ||
          review.rating.toString() ===
            rating;

        return (
          matchesSearch &&
          matchesRating
        );
      },
    );

  /*
   * Pagination
   */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredReviews.length /
          REVIEWS_PER_PAGE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const startIndex =
    (safeCurrentPage - 1) *
    REVIEWS_PER_PAGE;

  const paginatedReviews =
    filteredReviews.slice(
      startIndex,
      startIndex +
        REVIEWS_PER_PAGE,
    );

  const hasFilters =
    Boolean(search) ||
    rating !== "ALL";

  return (
    <div className="space-y-8">
      {/* Heading */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-100 px-6 py-8 shadow-sm dark:border-violet-900 dark:from-violet-950/30 dark:via-fuchsia-950/20 dark:to-amber-950/20 sm:px-8">
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
            View and search the
            reviews you submitted
            for returned rental
            equipment.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total reviews */}
        <Card className="border-violet-200 bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-sm dark:border-violet-900 dark:from-violet-950/40 dark:to-fuchsia-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
              <MessageSquareText className="size-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
                Total Reviews
              </p>

              <p className="mt-1 text-3xl font-bold">
                {reviews.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average rating */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm dark:border-amber-900 dark:from-amber-950/40 dark:to-orange-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Star className="size-5 fill-current" />
            </div>

            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Average Rating
              </p>

              <p className="mt-1 text-3xl font-bold">
                {averageRating.toFixed(
                  1,
                )}
                /5
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Five star reviews */}
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-100 to-teal-50 shadow-sm dark:border-emerald-900 dark:from-emerald-950/40 dark:to-teal-950/20">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <Star className="size-5 fill-current" />
            </div>

            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                5-Star Reviews
              </p>

              <p className="mt-1 text-3xl font-bold">
                {fiveStarReviews}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search and filter */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Search and Filter Reviews
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <form
            action="/customer-dashboard/reviews"
            method="GET"
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="review-search"
                className="sr-only"
              >
                Search reviews
              </label>

              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="review-search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search gear, brand or comment"
                className="pl-9"
              />
            </div>

            {/* Rating filter */}
            <div>
              <label
                htmlFor="review-rating"
                className="sr-only"
              >
                Filter by rating
              </label>

              <select
                id="review-rating"
                name="rating"
                defaultValue={
                  rating
                }
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <option value="ALL">
                  All ratings
                </option>

                <option value="5">
                  5 stars
                </option>

                <option value="4">
                  4 stars
                </option>

                <option value="3">
                  3 stars
                </option>

                <option value="2">
                  2 stars
                </option>

                <option value="1">
                  1 star
                </option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button type="submit">
                <Search className="size-4" />
                Apply
              </Button>

              {hasFilters && (
                <Button
                  variant="outline"
                  asChild
                >
                  <Link href="/customer-dashboard/reviews">
                    <X className="size-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Reviews table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              Review History
            </CardTitle>

            <Badge variant="secondary">
              {
                filteredReviews.length
              }{" "}
              {filteredReviews.length ===
              1
                ? "result"
                : "results"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedReviews.length ===
          0 ? (
            /* Empty state */
            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                <Star className="size-8" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {hasFilters
                  ? "No matching reviews found"
                  : "No reviews yet"}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected rating."
                  : "After a rental is returned, you can submit a review from the My Rentals page."}
              </p>

              {hasFilters ? (
                <Button
                  variant="outline"
                  className="mt-5"
                  asChild
                >
                  <Link href="/customer-dashboard/reviews">
                    <X className="size-4" />
                    Clear Filters
                  </Link>
                </Button>
              ) : (
                <Button
                  className="mt-5"
                  asChild
                >
                  <Link href="/customer-dashboard/rentals">
                    View My Rentals
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">
                    Equipment
                  </TableHead>

                  <TableHead>
                    Rating
                  </TableHead>

                  <TableHead className="min-w-[280px]">
                    Comment
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    Reviewed
                  </TableHead>

                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedReviews.map(
                  (review) => (
                    <TableRow
                      key={
                        review.id
                      }
                    >
                      {/* Equipment */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                            <Package className="size-4" />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[180px] truncate font-medium">
                              {
                                review
                                  .gearItem
                                  .name
                              }
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {
                                review
                                  .gearItem
                                  .brand
                              }
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[
                            1, 2, 3, 4, 5,
                          ].map(
                            (
                              value,
                            ) => (
                              <Star
                                key={
                                  value
                                }
                                className={`size-4 ${
                                  value <=
                                  review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/25"
                                }`}
                              />
                            ),
                          )}

                          <span className="ml-1 text-sm font-semibold">
                            {
                              review.rating
                            }
                            /5
                          </span>
                        </div>
                      </TableCell>

                      {/* Comment */}
                      <TableCell>
                        <p className="max-w-[360px] line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {review.comment ||
                            "No written comment was provided."}
                        </p>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(
                          review.createdAt,
                        )}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link
                            href={`/gear/${review.gearItemId}`}
                          >
                            <Eye className="size-4" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredReviews.length >
        0 &&
        totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex +
                  REVIEWS_PER_PAGE,
                filteredReviews.length,
              )}{" "}
              of{" "}
              {
                filteredReviews.length
              }{" "}
              reviews
            </p>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <Button
                variant="outline"
                size="sm"
                disabled={
                  safeCurrentPage ===
                  1
                }
                asChild={
                  safeCurrentPage !==
                  1
                }
              >
                {safeCurrentPage ===
                1 ? (
                  <>
                    <ChevronLeft className="size-4" />
                    Previous
                  </>
                ) : (
                  <Link
                    href={createPageUrl(
                      {
                        page:
                          safeCurrentPage -
                          1,
                        search,
                        rating,
                      },
                    )}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Link>
                )}
              </Button>

              <Badge variant="outline">
                Page{" "}
                {safeCurrentPage}{" "}
                of {totalPages}
              </Badge>

              {/* Next */}
              <Button
                variant="outline"
                size="sm"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                asChild={
                  safeCurrentPage !==
                  totalPages
                }
              >
                {safeCurrentPage ===
                totalPages ? (
                  <>
                    Next
                    <ChevronRight className="size-4" />
                  </>
                ) : (
                  <Link
                    href={createPageUrl(
                      {
                        page:
                          safeCurrentPage +
                          1,
                        search,
                        rating,
                      },
                    )}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}