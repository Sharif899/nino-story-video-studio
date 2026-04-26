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
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <div style={{ marginLeft: "240px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0, width: "calc(100% - 240px)" }}>
            <Header />
            <main style={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
