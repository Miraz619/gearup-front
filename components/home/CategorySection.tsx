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
import { FaBicycle, FaFutbol } from "react-icons/fa";
import { GiCricketBat, GiShuttlecock } from "react-icons/gi";
import Link from "next/link";

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

export async function CategorySection() {
  const response = await getCategories();
  const categories = response.data;

  return (
    <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Explore Categories</Badge>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Find gear for your favorite activity
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Browse equipment by category and discover the right
            gear for sports, training, and outdoor activities.
          </p>
        </div>

        {/* Empty state */}
        {categories.length === 0 ? (
          <Card className="mx-auto mt-10 max-w-xl text-center">
            <CardHeader>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                <PackageSearch className="size-6 text-muted-foreground" />
              </div>

              <CardTitle>No categories available</CardTitle>

              <CardDescription>
                Categories have not been added yet. Please check
                again later.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            {/* Category cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.name);

                return (
                  <Link
                    key={category.id}
                    href={`/gear?categoryId=${category.id}`}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-6" />
                        </div>

                        <CardTitle className="pt-3 text-xl">
                          {category.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <CardDescription className="line-clamp-3 leading-6">
                          {category.description}
                        </CardDescription>

                        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                          Browse gear

                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/categories">
                  View all categories
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}