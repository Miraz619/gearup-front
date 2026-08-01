"use client";

import { loginUser } from "@/app/(authGroup)/_actions/loginUser";
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
import type { LoginUserPayload, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function getDashboardPath(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "/admin-dashboard";

    case "PROVIDER":
      return "/provider-dashboard";

    case "CUSTOMER":
      return "/customer-dashboard";

    default:
      return "/";
  }
}

export function LoginForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    const payload: LoginUserPayload = {
      email: values.email,
      password: values.password,
    };

    startTransition(async () => {
      const result = await loginUser(payload);

      if (!result.success || !result.user) {
        toast.error("Login failed", {
          description: result.message,
        });

        return;
      }

      toast.success("Login successful", {
        description: `Welcome back, ${result.user.name}.`,
      });

      const dashboardPath = getDashboardPath(
        result.user.role,
      );

      router.push(dashboardPath);
      router.refresh();
    });
  }

  return (
    <Card className="w-full max-w-md border-primary/10 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LogIn className="size-6" />
        </div>

        <CardTitle className="text-2xl">
          Welcome back
        </CardTitle>

        <CardDescription>
          Log in to manage rentals, gear, and your GearUp
          account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup>
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email">
                Email address
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                disabled={isPending}
                {...register("email")}
              />

              <FieldError>
                {errors.email?.message}
              </FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.password)}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="pr-10"
                  aria-invalid={Boolean(errors.password)}
                  disabled={isPending}
                  {...register("password")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>

              <FieldError>
                {errors.password?.message}
              </FieldError>
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="size-4" />
                  Login
                </>
              )}
            </Button>
          </FieldGroup>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}