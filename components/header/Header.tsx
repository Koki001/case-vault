import Image from "next/image";

import s from "./styles.module.css";

const Header = () => {
  return (
    <header className={s.headerContainer}>
      <Image
        src={"/Logos/HaltonPoliceService.png"}
        height={100}
        width={100}
        alt="Halton Police Service"
      />
      <div className={s.headerTitle}>
        <h1>Halton Regional Police Service</h1>
        <h2>One Vision, One Mission, One Team</h2>
      </div>
    </header>
  );
};
export default Header;
