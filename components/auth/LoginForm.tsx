"use client";

import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRef } from "react";

import s from "./styles.module.css"

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
      });

      if (res) {
        console.log(res, "success");
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
          type="text"
          label="Badge Number"
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
    </form>
  );
};
