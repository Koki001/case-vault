import Image from "next/image";
import s from "./layout.module.css";
import { Paper } from "@mui/material";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Paper elevation={5} className={`${s.authLayoutContainer} wrapper`}>
      <Image
        src={"/Logos/caseVaultLogo.gif"}
        width={150}
        height={150}
        alt="Case Vault"
      />
      <h2>HRPS CaseVault</h2>
      {children}
    </Paper>
  );
};
export default AuthLayout;
