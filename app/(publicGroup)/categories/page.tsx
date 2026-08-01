import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategories } from "@/service/getCategories";
import { ArrowRight, PackageSearch } from "lucide-react";
import Link from "next/link";
import { FaBicycle, FaFutbol } from "react-icons/fa";
import { GiCricketBat, GiShuttlecock } from "react-icons/gi";

const categoryIcons = {
  badminton: GiShuttlecock,
  football: FaFutbol,
  cricket: GiCricketBat,
  cycling: FaBicycle,
};

function getCategoryIcon(categoryName: string) {
  const normalizedName =
    categoryName.toLowerCase() as keyof typeof categoryIcons;

  return categoryIcons[normalizedName] || PackageSearch;
}

export default async function CategoriesPage() {
  const response = await getCategories();
  const categories = response.data;

  return (
    <section className="min-h-[70vh] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Gear Categories</Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore gear by category
          </h1>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Choose a sport or activity to find suitable equipment
            from GearUp providers.
          </p>
        </div>

        {/* Empty state */}
        {categories.length === 0 ? (
          <Card className="mx-auto mt-12 max-w-xl text-center">
            <CardHeader>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
                <PackageSearch className="size-7 text-muted-foreground" />
              </div>

              <CardTitle>No categories found</CardTitle>

              <CardDescription>
                There are currently no gear categories available.
                Please check again later.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name);

              return (
                <Card
                  key={category.id}
                  className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-7" />
                    </div>

                    <CardTitle className="pt-3 text-xl">
                      {category.name}
                    </CardTitle>

                    <CardDescription className="line-clamp-3 leading-6">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={`/gear?category=${category.id}`}
                      >
                        Browse {category.name}

                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}