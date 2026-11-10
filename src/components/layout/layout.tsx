import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TCM | Toll Collection Management",
  description: "Toll Collection Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}