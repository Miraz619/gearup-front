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
import type {
  LoginUserPayload,
  UserRole,
} from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  ShieldCheck,
  Store,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { GoogleSignInButton } from "./GoogleSignInButton";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormValues =
  z.infer<typeof loginSchema>;

type DemoRole =
  | "CUSTOMER"
  | "PROVIDER"
  | "ADMIN";

const demoAccounts: Record<
  DemoRole,
  {
    email: string;
    password: string;
  }
> = {
  CUSTOMER: {
    email: "customer.demo@gearup.com",
    password: "Demo12345!",
  },

  PROVIDER: {
    email: "provider.demo@gearup.com",
    password: "Demo12345!",
  },

  ADMIN: {
    email: "miraz765@gmail.com",
    password: "gearup431@#",
  },
};

function getDashboardPath(
  role: UserRole,
) {
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

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  function fillDemoAccount(
    role: DemoRole,
  ) {
    const account =
      demoAccounts[role];

    setValue(
      "email",
      account.email,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    setValue(
      "password",
      account.password,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    clearErrors();

    const roleName =
      role.charAt(0) +
      role.slice(1).toLowerCase();

    toast.success(
      `${roleName} demo selected`,
      {
        description:
          "Demo credentials have been filled in.",
      },
    );
  }

  function onSubmit(
    values: LoginFormValues,
  ) {
    const payload: LoginUserPayload = {
      email: values.email,
      password: values.password,
    };

    startTransition(async () => {
      const result =
        await loginUser(payload);

      if (
        !result.success ||
        !result.user
      ) {
        toast.error(
          "Login failed",
          {
            description:
              result.message,
          },
        );

        return;
      }

      toast.success(
        "Login successful",
        {
          description: `Welcome back, ${result.user.name}.`,
        },
      );

      const dashboardPath =
        getDashboardPath(
          result.user.role,
        );

      router.push(
        dashboardPath,
      );

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
          Log in to manage rentals,
          gear, and your GearUp
          account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Normal login */}
        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          noValidate
        >
          <FieldGroup>
            {/* Email */}
            <Field
              data-invalid={Boolean(
                errors.email,
              )}
            >
              <FieldLabel htmlFor="email">
                Email address
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(
                  errors.email,
                )}
                disabled={isPending}
                {...register("email")}
              />

              <FieldError>
                {errors.email?.message}
              </FieldError>
            </Field>

            {/* Password */}
            <Field
              data-invalid={Boolean(
                errors.password,
              )}
            >
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="pr-10"
                  aria-invalid={Boolean(
                    errors.password,
                  )}
                  disabled={isPending}
                  {...register(
                    "password",
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current,
                    )
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
                {
                  errors.password
                    ?.message
                }
              </FieldError>
            </Field>

            {/* Login button */}
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

        {/* Google divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Or continue with
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google Sign-In */}
        <GoogleSignInButton />

        {/* Demo divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Demo Login
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Demo buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Customer */}
          <Button
            type="button"
            variant="outline"
            className="h-auto flex-col gap-2 py-3"
            disabled={isPending}
            onClick={() =>
              fillDemoAccount(
                "CUSTOMER",
              )
            }
          >
            <UserRound className="size-4" />

            <span className="text-xs">
              Customer
            </span>
          </Button>

          {/* Provider */}
          <Button
            type="button"
            variant="outline"
            className="h-auto flex-col gap-2 py-3"
            disabled={isPending}
            onClick={() =>
              fillDemoAccount(
                "PROVIDER",
              )
            }
          >
            <Store className="size-4" />

            <span className="text-xs">
              Provider
            </span>
          </Button>

          {/* Admin */}
          <Button
            type="button"
            variant="outline"
            className="h-auto flex-col gap-2 py-3"
            disabled={isPending}
            onClick={() =>
              fillDemoAccount(
                "ADMIN",
              )
            }
          >
            <ShieldCheck className="size-4" />

            <span className="text-xs">
              Admin
            </span>
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Select a role to autofill
          demo credentials, then click
          Login.
        </p>

        {/* Register */}
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