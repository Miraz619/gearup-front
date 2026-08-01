"use client";

import { registerUser } from "@/app/(authGroup)/_actions/registerUser";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegisterUserPayload } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),

    email: z.string().trim().email("Please enter a valid email address"),

    password: z.string().min(6, "Password must contain at least 6 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    role: z.enum(["CUSTOMER", "PROVIDER"], {
      message: "Please select an account type",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    const payload: RegisterUserPayload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };

    startTransition(async () => {
      const result = await registerUser(payload);

      if (!result.success) {
        toast.error("Registration failed", {
          description: result.message,
        });

        return;
      }

      toast.success("Account created successfully", {
        description: "You can now log in to your GearUp account.",
      });

      router.push("/login");
    });
  }

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UserPlus className="size-6" />
        </div>

        <CardTitle className="text-2xl">Create your account</CardTitle>

        <CardDescription>
          Join GearUp as a customer or equipment provider.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {/* Name */}
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>

              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                disabled={isPending}
                {...register("name")}
              />

              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            {/* Email */}
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email">Email address</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                disabled={isPending}
                {...register("email")}
              />

              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            {/* Role */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Field data-invalid={Boolean(errors.role)}>
                  <FieldLabel>Account type</FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={Boolean(errors.role)}
                    >
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="CUSTOMER">
                        Customer — rent equipment
                      </SelectItem>

                      <SelectItem value="PROVIDER">
                        Provider — list equipment
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FieldError>{errors.role?.message}</FieldError>
                </Field>
              )}
            />

          
            <Field data-invalid={Boolean(errors.password)}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
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
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>

              <FieldError>{errors.password?.message}</FieldError>
            </Field>

       
            <Field data-invalid={Boolean(errors.confirmPassword)}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  className="pr-10"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  disabled={isPending}
                  {...register("confirmPassword")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  disabled={isPending}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>

              <FieldError>{errors.confirmPassword?.message}</FieldError>
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
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="size-4" />
                  Create Account
                </>
              )}
            </Button>
          </FieldGroup>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
