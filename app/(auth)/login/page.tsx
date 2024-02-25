import { LoginForm } from "@/components/auth/LoginForm";


import s from "./page.module.css"

const LoginPage = () => {
  return (
    <div className={s.loginContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
