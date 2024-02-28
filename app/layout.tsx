import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import { Suspense } from "react";
import { auth } from "../auth";

import s from "./page.module.css";
import Notifications from "../components/modals/Notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          <Notifications />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
