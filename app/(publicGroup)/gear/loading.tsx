import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GearLoading() {
  return (
    <div className="space-y-8">

      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-6 w-32" />

        <Skeleton className="mx-auto h-10 w-80" />

        <Skeleton className="mx-auto h-5 w-full max-w-xl" />
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {Array.from({
          length: 9,
        }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-4 p-4">

              <Skeleton className="aspect-[4/3] w-full rounded-xl" />

              <Skeleton className="h-5 w-40" />

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-10 w-full" />

            </CardContent>
          </Card>
        ))}

      </div>

    </div>
  );
}