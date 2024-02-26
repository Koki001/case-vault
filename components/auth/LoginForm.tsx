"use client";

import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRef } from "react";

import s from "./styles.module.css";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // const handleDemoMichael = async () => {
  //   const email = "msmith@mail.com";
  //   const password = "123123";
  //   try {
  //     const res = await signIn("Credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (res) {
  //       console.log(res, "DEMO MICHAEL");
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDemoEmily = async () => {
  //   const email = "edavis@mail.com";
  //   const password = "123123";

  //   try {
  //     const res = await signIn("Credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (res) {
  //       console.log(res, "DEMO EMILY");
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await signIn("badge-login", {
        email,
        password,
        redirect: true,
      });

      if (res) {
        console.log(res, "REGULAR");
        // router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={s.loginFormContainer} onSubmit={handleLogin}>
      <div>
        <TextField
          inputRef={emailRef}
          id="email"
          name="email"
          type="email"
          label="Email"
          fullWidth
          required
        />
      </div>
      <div>
        <TextField
          inputRef={passwordRef}
          id="password"
          name="password"
          type="password"
          label="Password"
          fullWidth
          required
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
      {/* <Button onClick={handleDemoMichael} variant="contained" type="button">
        Log in as Michael Smith
      </Button>
      <Button onClick={handleDemoEmily} variant="contained" type="button">
        Log in as Emily Davis
      </Button> */}
    </form>
  );
};
