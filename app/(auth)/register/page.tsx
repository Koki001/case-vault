import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

import s from "./page.module.css"

const RegisterPage = () => {
  return (
    <div className={s.registerContainer}>
      <h2>Register</h2>
      <RegisterForm />
      <Link href={"/login"}>Already have an account?</Link>
    </div>
  );
};
export default RegisterPage;
