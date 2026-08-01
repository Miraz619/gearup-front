
import { Button } from "@/components/ui/button";
import { getSingleGear } from "@/service/getSingleGear";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreateRentalForm } from "../_actions/_components/CreateRentalForm";

type CreateRentalPageProps = {
  searchParams: Promise<{
    gearId?: string;
  }>;
};

export default async function CreateRentalPage({
  searchParams,
}: CreateRentalPageProps) {
  const { gearId } = await searchParams;

  if (!gearId) {
    notFound();
  }

  let response;

  try {
    response = await getSingleGear(gearId);
  } catch {
    notFound();
  }

  const gear = response.data;

  if (!gear.isAvailable || gear.stock === 0) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" className="-ml-3" asChild>
          <Link href={`/gear/${gear.id}`}>
            <ArrowLeft className="size-4" />
            Back to Gear
          </Link>
        </Button>

        <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
          <h1 className="text-xl font-semibold">
            This gear is currently unavailable
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Please choose another available item from the gear page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <Button variant="ghost" className="-ml-3 mb-3" asChild>
          <Link href={`/gear/${gear.id}`}>
            <ArrowLeft className="size-4" />
            Back to Gear
          </Link>
        </Button>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Rent Equipment
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Select your rental dates and quantity for {gear.name}.
        </p>
      </div>

      <CreateRentalForm gear={gear} />
    </div>
  );
}