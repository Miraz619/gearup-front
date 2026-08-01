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

  const gear = response.data;
  const price = Number(gear.pricePerDay);

  const averageRating =
    gear.reviews.length > 0
      ? gear.reviews.reduce(
          (total, review) => total + review.rating,
          0,
        ) / gear.reviews.length
      : 0;

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
                alt={gear.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-muted">
                <Box className="size-24 text-primary/40" />
              </div>
            )}

            <Badge className="absolute left-4 top-4">
              {gear.category.name}
            </Badge>
          </div>

          {/* Gear information */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {gear.brand}
              </Badge>

              <Badge
                variant={
                  gear.isAvailable ? "default" : "secondary"
                }
              >
                {gear.isAvailable ? (
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
              {gear.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              {gear.description ||
                "No description is available for this gear."}
            </p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-4xl font-bold">
                ৳{price.toLocaleString()}
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
                      {gear.stock} items
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
                      {gear.reviews.length > 0
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

                  <span>{gear.provider.name}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-primary" />

                  <a
                    href={`mailto:${gear.provider.email}`}
                    className="transition-colors hover:text-primary"
                  >
                    {gear.provider.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="mt-6 w-full"
              disabled={!gear.isAvailable || gear.stock === 0}
              asChild={gear.isAvailable && gear.stock > 0}
            >
              {gear.isAvailable && gear.stock > 0 ? (
                <Link href={`/rentals/create?gearId=${gear.id}`}>
                  Rent This Gear
                </Link>
              ) : (
                <span>Currently Unavailable</span>
              )}
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Reviews */}
        <div>
          <div>
            <Badge variant="secondary">
              Customer Reviews
            </Badge>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              What renters say
            </h2>
          </div>

          {gear.reviews.length === 0 ? (
            <Card className="mt-6">
              <CardContent className="py-10 text-center">
                <Star className="mx-auto size-10 text-muted-foreground" />

                <p className="mt-4 font-semibold">
                  No reviews yet
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  This gear has not received any customer reviews.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {gear.reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              className={
                                index < review.rating
                                  ? "size-4 fill-current text-amber-500"
                                  : "size-4 text-muted-foreground"
                              }
                            />
                          ),
                        )}
                      </div>

                      <Badge variant="outline">
                        {review.rating}/5
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="leading-7 text-muted-foreground">
                      {review.comment}
                    </p>

                    <p className="mt-4 text-xs text-muted-foreground">
                      {new Date(
                        review.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}