import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nino Story Video Studio",
  description: "AI video idea generator for crypto and AI projects on X",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}