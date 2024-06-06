import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./Provider";
import { SidebarProvider } from "@/app/context/SidebarContext";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillForge",
  description: "Web LMS by Jhenna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster theme="light" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
