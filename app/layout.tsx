import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
// import { auth } from "../auth";

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
  // const session = await auth();
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <Header />
          <Sidebar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
