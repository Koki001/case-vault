"use client";

import { useRef } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = {
    //   firstName: firstNameRef.current?.value,
    //   lastName: lastNameRef.current?.value,
    //   email: emailRef.current?.value,
    //   password: passwordRef.current?.value,
    //   confirmPassword: confirmPasswordRef.current?.value,
    // };

    // try {
    //   const res = await fetch("api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (res.ok) {
    //     router.push("/login");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          inputRef={firstNameRef}
          id="firstName"
          name="firstName"
          label="First Name"
          fullWidth
          required
        />
      </div>
      <div>
        <TextField
          inputRef={lastNameRef}
          id="lastName"
          name="lastName"
          label="Surname"
          fullWidth
          required
        />
      </div>
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
      <div>
        <TextField
          inputRef={confirmPasswordRef}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          fullWidth
          required
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};
