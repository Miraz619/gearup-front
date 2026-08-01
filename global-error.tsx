"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#ffffff",
          color: "#111827",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ maxWidth: "440px", textAlign: "center" }}>
            <title>GearUp encountered an error</title>

            <h1>GearUp could not load</h1>

            <p>
              An unexpected application error occurred. Please try again.
            </p>

            {error.digest && (
              <p style={{ fontSize: "12px", color: "#6b7280" }}>
                Error reference: {error.digest}
              </p>
            )}

            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "16px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}