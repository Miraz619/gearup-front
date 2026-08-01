import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "GearUp",
  description: "Rent sports and outdoor gear from trusted providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster
          richColors
          position="top-right"
          closeButton
        />
      </body>
    </html>
  );
}