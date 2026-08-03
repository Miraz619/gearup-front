import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <Card>
        <CardContent className="space-y-4 p-8">
          <Skeleton className="h-6 w-40" />

          <Skeleton className="h-10 w-72" />

          <Skeleton className="h-5 max-w-xl" />
        </CardContent>
      </Card>


      {/* Stats */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {Array.from({
          length: 6,
        }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-5 p-6">

              <Skeleton className="size-12 rounded-2xl" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-8 w-16" />

                <Skeleton className="h-3 w-36" />
              </div>

            </CardContent>
          </Card>
        ))}

      </section>


      {/* Summary */}
      <section className="grid gap-5 lg:grid-cols-2">

        {Array.from({
          length: 2,
        }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-5 p-6">

              <Skeleton className="h-6 w-40" />

              <Skeleton className="h-20 w-full" />

              <Skeleton className="h-3 w-full" />

              <Skeleton className="h-3 w-3/4" />

            </CardContent>
          </Card>
        ))}

      </section>

    </div>
  );
}