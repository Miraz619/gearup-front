import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-4 text-center">

        <Skeleton className="mx-auto size-12 rounded-full" />

        <Skeleton className="mx-auto h-4 w-48" />

        <Skeleton className="mx-auto h-3 w-64" />

      </div>
    </div>
  );
}