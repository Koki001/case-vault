"use client";

import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";

import s from "./styles.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../store/authSlice";
import { useNotificationStore } from "../../store/notificationSlice";

export const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const setLoading = useAuthStore((state) => state.setLoading);
  const loading = useAuthStore((state) => state.loading);
  const params = useSearchParams()
  const notification = useNotificationStore((state) => state.setNotification)
  
  const handleDemoMichael = async () => {
    const email = "msmith@mail.com";
    const password = "123123";
    try {
      setLoading(true);
      const res = await signIn("badge-login", {
        email,
        password,
        redirect: true,
      });
      setLoading(false);
      if (res) {
        setLoading(false);
        console.log(res, "DEMO MICHAEL");
        // router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDemoEmily = async () => {
    const email = "edavis@mail.com";
    const password = "123123";

    try {
      setLoading(true);
      const res = await signIn("badge-login", {
        email,
        password,
        redirect: true,
      });
      setLoading(false);
      if (res) {
        setLoading(false);
        console.log(res, "DEMO EMILY");
        // router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      setLoading(true);
      const res = await signIn("badge-login", {
        email,
        password,
        redirect: true,
      });
      if (res) {
        setLoading(false);
        console.log(res, "REGULAR");
      } 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const error = params.get("error")
    if (error){
      notification(true, "Invalid Credentials")
      router.push("/login")
    }
  }, [params])

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
          // required
          disabled
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
          // required
          disabled
        />
      </div>
      <Button
        // disabled={loading}
        disabled
        type="submit"
        variant="contained"
        color="primary"
      >
        Log In
      </Button>
      <Button
        disabled={loading}
        onClick={handleDemoMichael}
        variant="contained"
        type="button"
      >
        Log in as Michael Smith
      </Button>
      <Button
        disabled={loading}
        onClick={handleDemoEmily}
        variant="contained"
        type="button"
      >
        Log in as Emily Davis
      </Button>
    </form>
  );
};
