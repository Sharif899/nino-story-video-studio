import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Nino Story Video Studio",
  description: "AI video idea generator for crypto and AI projects on X",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen bg-[#0a0a0f]">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 md:ml-60">
            <Header />
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
