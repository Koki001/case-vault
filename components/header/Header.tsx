"use client";

import Image from "next/image";

import s from "./styles.module.css";
import Link from "next/link";
import Navbar from "../navbar/Navbar";
import { Button, IconButton } from "@mui/material";
import { useNavStore } from "../../store/burgerSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserStore } from "../../store/userSlice";
const Header = () => {
  const showNav = useNavStore((state) => state.setLoading);
  const userBadge = useUserStore((state) => state.badgeNumber);

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
          {userBadge && (
            <IconButton
              onClick={() => showNav(true)}
              className={s.hamburgerMenu}
            >
              <MenuIcon
                sx={{ width: "100%", height: "100%", color: "white" }}
              />
            </IconButton>
          )}
        </div>
      </div>
      <Navbar />
    </header>
  );
};
export default Header;
