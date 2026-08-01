"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createCheckoutSession } from "../_actions/createCheckoutSession";

type PayNowButtonProps = {
  rentalOrderId: string;
};

export default function PayNowButton({
  rentalOrderId,
}: PayNowButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handlePayment = async () => {
    try {
      setIsPending(true);

      const result =
        await createCheckoutSession(rentalOrderId);

      if (
        !result.success ||
        !("paymentUrl" in result) ||
        !result.paymentUrl
      ) {
        toast.error(
          result.message || "Unable to start payment",
        );
        return;
      }

      window.location.assign(result.paymentUrl);
    } catch {
      toast.error("Unable to start payment");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handlePayment}
      disabled={isPending}
      className="bg-blue-600 text-white hover:bg-blue-700"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Redirecting...
        </>
      ) : (
        <>
          <CreditCard className="size-4" />
          Pay Now
        </>
      )}
    </Button>
  );
}