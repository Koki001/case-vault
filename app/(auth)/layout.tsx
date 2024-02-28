import Image from "next/image";
import s from "./layout.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${s.authLayoutContainer} wrapper`}>
      <Image
        src={"/Logos/caseVaultLogo.gif"}
        width={150}
        height={150}
        alt="Case Vault"
      />
      <h2>HRPS CaseVault</h2>
      {children}
    </div>
  );
};
export default AuthLayout;
