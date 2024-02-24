"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main>
      <h1>next js server stuff</h1>
      <Link href={"/login"}>click me</Link>
    </main>
  );
}
