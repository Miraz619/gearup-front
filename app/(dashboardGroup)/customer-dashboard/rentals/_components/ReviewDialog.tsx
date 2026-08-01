"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createReview } from "../_actions/createReview";

type ReviewDialogProps = {
  gearItemId: string;
  gearName: string;
};

export default function ReviewDialog({
  gearItemId,
  gearName,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setIsPending(true);

      const result = await createReview({
        gearItemId,
        rating,
        comment: comment.trim() || undefined,
      });

      if (!result.success) {
        toast.error(
          result.message || "Failed to submit review",
        );
        return;
      }

      toast.success(result.message);
      setRating(0);
      setComment("");
      setOpen(false);
    } catch {
      toast.error("Unable to submit review");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Star className="size-4" />
          Write Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Review {gearName}
          </DialogTitle>

          <DialogDescription>
            Share your experience with this equipment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Rating</Label>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="rounded-md p-1 transition-transform hover:scale-110"
                  aria-label={`Give ${value} star rating`}
                >
                  <Star
                    className={`size-8 ${
                      value <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {rating === 0
                ? "Select between 1 and 5 stars"
                : `${rating} out of 5 stars`}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`review-${gearItemId}`}>
              Comment
            </Label>

            <Textarea
              id={`review-${gearItemId}`}
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              placeholder="Describe the equipment quality and your rental experience..."
              rows={5}
              maxLength={500}
            />

            <p className="text-right text-xs text-muted-foreground">
              {comment.length}/500
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || rating < 1}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Star className="size-4" />
                Submit Review
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}