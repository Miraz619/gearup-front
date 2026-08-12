import { Providers } from "@/components/provider/providers";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "GearUp",
  description: "Rent sports and outdoor gear from trusted providers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  suppressHydrationWarning
  data-scroll-behavior="smooth"
>
      <body>
        <Providers>{children}</Providers>

        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
