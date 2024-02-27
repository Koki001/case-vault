import Image from "next/image";

import s from "./styles.module.css";
import Link from "next/link";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <header className={s.headerContainer}>
      <div className={s.headerMain}>
        <div className={`${s.headerWrapper} wrapper`}>
          <Link href={"/"}>
            <Image
              src={"/Logos/HaltonPoliceService.png"}
              height={100}
              width={100}
              alt="Halton Police Service"
            />
          </Link>
          <div className={s.headerTitle}>
            <h1>Halton Regional Police Service</h1>
            <h2>One Vision, One Mission, One Team</h2>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
};
export default Header;
