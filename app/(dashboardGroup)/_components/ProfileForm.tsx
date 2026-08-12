"use client";

import { updateProfile } from "@/app/(dashboardGroup)/_actions/updateProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AuthUser } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must be at least 2 characters",
    )
    .max(
      60,
      "Name cannot exceed 60 characters",
    ),
});

type ProfileFormValues =
  z.infer<typeof profileSchema>;

type ProfileFormProps = {
  user: AuthUser;
};

function getRoleLabel(
  role: AuthUser["role"],
) {
  switch (role) {
    case "CUSTOMER":
      return "Customer";

    case "PROVIDER":
      return "Provider";

    case "ADMIN":
      return "Administrator";
  }
}

export function ProfileForm({
  user,
}: ProfileFormProps) {
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(
      profileSchema,
    ),

    defaultValues: {
      name: user.name,
    },
  });

  function onSubmit(
    values: ProfileFormValues,
  ) {
    startTransition(async () => {
      const result =
        await updateProfile({
          name: values.name,
        });

      if (!result.success) {
        toast.error(
          "Profile update failed",
          {
            description:
              result.message,
          },
        );

        return;
      }

      toast.success(
        "Profile updated",
        {
          description:
            result.message,
        },
      );

      router.refresh();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
      {/* Profile summary */}
      <Card>
        <CardHeader>
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserRound className="size-8" />
          </div>

          <CardTitle className="mt-4">
            {user.name}
          </CardTitle>

          <CardDescription>
            {user.email}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Mail className="size-4 text-primary" />

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Email
              </p>

              <p className="truncate text-sm font-medium">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <ShieldCheck className="size-4 text-primary" />

            <div>
              <p className="text-xs text-muted-foreground">
                Account role
              </p>

              <p className="text-sm font-medium">
                {getRoleLabel(
                  user.role,
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card>
        <CardHeader>
          <CardTitle>
            Edit Profile
          </CardTitle>

          <CardDescription>
            Update your personal account
            information.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(
              onSubmit,
            )}
            noValidate
          >
            <FieldGroup>
              {/* Name */}
              <Field
                data-invalid={Boolean(
                  errors.name,
                )}
              >
                <FieldLabel htmlFor="name">
                  Full name
                </FieldLabel>

                <Input
                  id="name"
                  placeholder="Your full name"
                  disabled={isPending}
                  aria-invalid={Boolean(
                    errors.name,
                  )}
                  {...register("name")}
                />

                <FieldError>
                  {errors.name?.message}
                </FieldError>
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="profile-email">
                  Email address
                </FieldLabel>

                <Input
                  id="profile-email"
                  value={user.email}
                  disabled
                  readOnly
                />

                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                  from your profile.
                </p>
              </Field>

              {/* Role */}
              <Field>
                <FieldLabel htmlFor="profile-role">
                  Account role
                </FieldLabel>

                <Input
                  id="profile-role"
                  value={getRoleLabel(
                    user.role,
                  )}
                  disabled
                  readOnly
                />
              </Field>

              <Button
                type="submit"
                className="w-fit"
                disabled={
                  isPending ||
                  !isDirty
                }
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}