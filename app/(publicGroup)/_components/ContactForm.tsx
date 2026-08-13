"use client";

import { sendContactMessage } from "@/app/(publicGroup)/_actions/sendContactMessage";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Send,
} from "lucide-react";
import { useTransition } from "react";
import {
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
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

  email: z
    .string()
    .trim()
    .email(
      "Please enter a valid email address",
    ),

  subject: z
    .string()
    .trim()
    .min(
      3,
      "Subject must be at least 3 characters",
    )
    .max(
      100,
      "Subject cannot exceed 100 characters",
    ),

  message: z
    .string()
    .trim()
    .min(
      10,
      "Message must be at least 10 characters",
    )
    .max(
      1000,
      "Message cannot exceed 1000 characters",
    ),
});

type ContactFormValues =
  z.infer<typeof contactSchema>;

export function ContactForm() {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(
      contactSchema,
    ),

    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(
    values: ContactFormValues,
  ) {
    startTransition(async () => {
      const result =
        await sendContactMessage(
          values,
        );

      if (!result.success) {
        toast.error(
          "Unable to send message",
          {
            description:
              result.message,
          },
        );

        return;
      }

      toast.success(
        "Message sent successfully",
        {
          description:
            "Thanks for contacting GearUp. Your message has been received.",
        },
      );

      reset();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
      )}
      noValidate
      className="space-y-6"
    >
      <FieldGroup>
        {/* Name */}
        <Field
          data-invalid={Boolean(
            errors.name,
          )}
        >
          <FieldLabel htmlFor="contact-name">
            Full Name
          </FieldLabel>

          <Input
            id="contact-name"
            placeholder="Enter your full name"
            autoComplete="name"
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
        <Field
          data-invalid={Boolean(
            errors.email,
          )}
        >
          <FieldLabel htmlFor="contact-email">
            Email Address
          </FieldLabel>

          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isPending}
            aria-invalid={Boolean(
              errors.email,
            )}
            {...register("email")}
          />

          <FieldError>
            {errors.email?.message}
          </FieldError>
        </Field>

        {/* Subject */}
        <Field
          data-invalid={Boolean(
            errors.subject,
          )}
        >
          <FieldLabel htmlFor="contact-subject">
            Subject
          </FieldLabel>

          <Input
            id="contact-subject"
            placeholder="How can we help?"
            disabled={isPending}
            aria-invalid={Boolean(
              errors.subject,
            )}
            {...register(
              "subject",
            )}
          />

          <FieldError>
            {errors.subject?.message}
          </FieldError>
        </Field>

        {/* Message */}
        <Field
          data-invalid={Boolean(
            errors.message,
          )}
        >
          <FieldLabel htmlFor="contact-message">
            Message
          </FieldLabel>

          <textarea
            id="contact-message"
            placeholder="Write your message here..."
            rows={6}
            disabled={isPending}
            aria-invalid={Boolean(
              errors.message,
            )}
            className="flex min-h-32 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
            {...register(
              "message",
            )}
          />

          <FieldError>
            {errors.message?.message}
          </FieldError>
        </Field>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-fit"
          disabled={
            isPending ||
            !isDirty
          }
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send Message
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}