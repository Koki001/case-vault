import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

import s from "./page.module.css"

const LoginPage = () => {
  return (
    <div className={s.loginContainer}>
      <LoginForm />
      {/* should not be needed */}
      {/* <Link href={"/register"}>Create account</Link> */}
    </div>
  );
};

export default LoginPage;
