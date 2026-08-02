import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSingleGear } from "@/service/getSingleGear";
import {
  ArrowLeft,
  Box,
  CheckCircle2,
  Mail,
  Package,
  Star,
  UserRound,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type GearDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GearDetailsPage({
  params,
}: GearDetailsPageProps) {
  const { id } = await params;

  let response;

  try {
    response = await getSingleGear(id);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "GEAR_NOT_FOUND"
    ) {
      notFound();
    }

    throw error;
  }

  if (!response?.data) {
    notFound();
  }

  const gear = response.data;

  const reviews = Array.isArray(gear.reviews)
    ? gear.reviews
    : [];

  const price = Number(gear.pricePerDay);

  const formattedPrice = Number.isFinite(price)
    ? price.toLocaleString()
    : "0";

  const stock = Number(gear.stock) || 0;

  const isAvailable =
    Boolean(gear.isAvailable) && stock > 0;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) =>
            total + Number(review.rating || 0),
          0,
        ) / reviews.length
      : 0;

  const categoryName =
    gear.category?.name || "Uncategorized";

  const providerName =
    gear.provider?.name || "Unknown provider";

  const providerEmail =
    gear.provider?.email || "";

  return (
    <section className="min-h-[70vh] py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6"
          asChild
        >
          <Link href="/gear">
            <ArrowLeft className="size-4" />
            Back to Gear
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gear image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border bg-muted shadow-sm">
            {gear.imageUrl ? (
              <Image
                src={gear.imageUrl}
                alt={gear.name || "Gear image"}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-muted">
                <Box className="size-24 text-primary/40" />
              </div>
            )}

            <Badge className="absolute left-4 top-4 z-10">
              {categoryName}
            </Badge>
          </div>

          {/* Gear information */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {gear.brand || "Unknown brand"}
              </Badge>

              <Badge
                variant={
                  isAvailable ? "default" : "secondary"
                }
              >
                {isAvailable ? (
                  <>
                    <CheckCircle2 className="size-3.5" />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle className="size-3.5" />
                    Unavailable
                  </>
                )}
              </Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {gear.name || "Unnamed gear"}
            </h1>

            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              {gear.description ||
                "No description is available for this gear."}
            </p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-4xl font-bold">
                ৳{formattedPrice}
              </span>

              <span className="pb-1 text-muted-foreground">
                per day
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Package className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Available stock
                    </p>

                    <p className="font-semibold">
                      {stock} {stock === 1 ? "item" : "items"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Star className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Customer rating
                    </p>

                    <p className="font-semibold">
                      {reviews.length > 0
                        ? `${averageRating.toFixed(1)} / 5`
                        : "No ratings yet"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  Provider information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <UserRound className="size-4 text-primary" />

                  <span>{providerName}</span>
                </div>

                {providerEmail ? (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="size-4 text-primary" />

                    <a
                      href={`mailto:${providerEmail}`}
                      className="break-all transition-colors hover:text-primary"
                    >
                      {providerEmail}
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="size-4" />

                    <span>Email unavailable</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {isAvailable ? (
              <Button
                size="lg"
                className="mt-6 w-full"
                asChild
              >
                <Link href={`/customer-dashboard/rentals/create?gearId=${id}`}>
  Rent This Gear
</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                className="mt-6 w-full"
                disabled
              >
                Currently Unavailable
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Reviews */}
        <div>
          <Badge variant="secondary">
            Customer Reviews
          </Badge>

          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            What renters say
          </h2>

          {reviews.length === 0 ? (
            <Card className="mt-6">
              <CardContent className="py-10 text-center">
                <Star className="mx-auto size-10 text-muted-foreground" />

                <p className="mt-4 font-semibold">
                  No reviews yet
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  This gear has not received any customer
                  reviews.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {reviews.map((review) => {
                const rating = Math.min(
                  5,
                  Math.max(
                    0,
                    Number(review.rating) || 0,
                  ),
                );

                const reviewDate = new Date(
                  review.createdAt,
                );

                const formattedDate = Number.isNaN(
                  reviewDate.getTime(),
                )
                  ? "Date unavailable"
                  : reviewDate.toLocaleDateString();

                return (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1">
                          {Array.from({
                            length: 5,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              className={
                                index < rating
                                  ? "size-4 fill-current text-amber-500"
                                  : "size-4 text-muted-foreground"
                              }
                            />
                          ))}
                        </div>

                        <Badge variant="outline">
                          {rating}/5
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="leading-7 text-muted-foreground">
                        {review.comment ||
                          "No written comment was provided."}
                      </p>

                      <p className="mt-4 text-xs text-muted-foreground">
                        {formattedDate}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}