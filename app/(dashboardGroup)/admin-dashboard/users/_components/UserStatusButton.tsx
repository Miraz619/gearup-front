"use client";

import { Button } from "@/components/ui/button";
import { updateUserStatus } from "../_actions/updateUserStatus";
import { Loader2, LockKeyhole, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type UserStatusButtonProps = {
  userId: string;
  isActive: boolean;
  disabled?: boolean;
};

export function UserStatusButton({
  userId,
  isActive,
  disabled = false,
}: UserStatusButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async () => {
    setIsPending(true);

    const result = await updateUserStatus(
      userId,
      !isActive,
    );

    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }

    setIsPending(false);
  };

  return (
    <Button
      type="button"
      size="sm"
      variant={isActive ? "destructive" : "default"}
      disabled={disabled || isPending}
      onClick={handleUpdate}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isActive ? (
        <LockKeyhole className="size-4" />
      ) : (
        <UserCheck className="size-4" />
      )}

      {isPending
        ? "Updating..."
        : isActive
          ? "Deactivate"
          : "Activate"}
    </Button>
  );
}