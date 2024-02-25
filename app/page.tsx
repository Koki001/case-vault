"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main>
      <h1>next js server stuff</h1>
      <Link href={"/login"}>click me</Link>
    </main>
  );
};

export default Home;
