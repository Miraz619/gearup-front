"use client";

import { googleLogin } from "@/app/(authGroup)/_actions/googleLogin";
import type { UserRole } from "@/types/auth";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  useRef,
  useTransition,
} from "react";
import { toast } from "sonner";

type GoogleCredentialResponse = {
  credential: string;
  select_by?: string;
};

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (
      response: GoogleCredentialResponse,
    ) => void;
  }) => void;

  renderButton: (
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?:
        | "outline"
        | "filled_blue"
        | "filled_black";
      size?: "small" | "medium" | "large";
      text?:
        | "signin_with"
        | "signup_with"
        | "continue_with"
        | "signin";
      shape?:
        | "rectangular"
        | "pill"
        | "circle"
        | "square";
      logo_alignment?: "left" | "center";
      width?: number;
    },
  ) => void;
};

type GoogleWindow =
  typeof window & {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  };

function getDashboardPath(
  role: UserRole,
) {
  switch (role) {
    case "ADMIN":
      return "/admin-dashboard";

    case "PROVIDER":
      return "/provider-dashboard";

    default:
      return "/customer-dashboard";
  }
}

export function GoogleSignInButton() {
  const router = useRouter();

  const buttonRef =
    useRef<HTMLDivElement>(null);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const clientId =
    process.env
      .NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  function initializeGoogle() {
    const googleWindow =
      window as GoogleWindow;

    if (
      !clientId ||
      !googleWindow.google ||
      !buttonRef.current
    ) {
      return;
    }

    googleWindow.google.accounts.id.initialize(
      {
        client_id: clientId,

        callback: (response) => {
          if (!response.credential) {
            toast.error(
              "Google sign-in failed",
            );
            return;
          }

          startTransition(
            async () => {
              const result =
                await googleLogin(
                  response.credential,
                );

              if (
                !result.success ||
                !result.user
              ) {
                toast.error(
                  "Google sign-in failed",
                  {
                    description:
                      result.message,
                  },
                );

                return;
              }

              toast.success(
                "Google sign-in successful",
                {
                  description: `Welcome, ${result.user.name}.`,
                },
              );

              router.push(
                getDashboardPath(
                  result.user.role,
                ),
              );

              router.refresh();
            },
          );
        },
      },
    );

    buttonRef.current.innerHTML = "";

    const buttonWidth = Math.min(
      buttonRef.current.offsetWidth ||
        350,
      400,
    );

    googleWindow.google.accounts.id.renderButton(
      buttonRef.current,
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: buttonWidth,
      },
    );
  }

  if (!clientId) {
    return (
      <p className="text-center text-sm text-destructive">
        Google Sign-In is not configured.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={initializeGoogle}
      />

      <div
        className={
          isPending
            ? "pointer-events-none w-full opacity-60"
            : "w-full"
        }
      >
        <div
          ref={buttonRef}
          className="flex min-h-11 w-full justify-center"
        />

        {isPending && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Signing in with Google...
          </p>
        )}
      </div>
    </>
  );
}