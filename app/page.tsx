"use client";

import { Button } from "@mui/material";
import Link from "next/link";

import s from "./page.module.css"

const Home = () => {
  return (
    <main className={s.mainContainerTag}>
      <h1>next js app</h1>
      <p>
        Thanks for visiting! Just a heads up - this project was built without
        the intention to be used on a mobile device. This is definitely subject
        to change but that is the current state.
      </p>
      <p>
        Below you will find a list of completed and planned features. At any
        time, feel free to go to the login screen and explore the site!
      </p>
      <Link href={"/login"}>
        <Button variant="outlined">Get started</Button>
      </Link>
    </main>
  );
};

export default Home;
