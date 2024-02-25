"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/store/userSlice";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import s from "./styles.module.css";
import { Button } from "@mui/material";

const sidebarStyleObj = {
  "&.MuiButtonBase-root": {
    color: "black",
  },
  "&:hover": {
    color: "white",
    backgroundColor: "#0288d1",
  },
  "&:active": {
    color: "white",
    backgroundColor: "#0277bd",
  },
  "&.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#0277bd",
  },
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#01579b",
  },
};

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams?.get("view") || "overview";

  const { data: session, status } = useSession();
  const { firstName, lastName, email, badgeNumber } = useUserStore();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView !== null) {
      router.push(`?view=${newView}`);
    }
  };

  if (status === "authenticated" && email) {
    return (
      <div className={s.sidebarContainer}>
        <div className={s.sidebarUserInfo}>
          <h3>
            <span>{firstName}</span>
            <span>{lastName}</span>
          </h3>
          <h4>#{badgeNumber}</h4>
        </div>
        <ul className={s.sidebarContent}>
          <ToggleButtonGroup
            color="primary"
            orientation="vertical"
            value={currentView}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <li>
              <ToggleButton disableRipple sx={sidebarStyleObj} value="overview">
                overview
              </ToggleButton>
            </li>
            <li>
              <ToggleButton disableRipple sx={sidebarStyleObj} value="case">
                cases
              </ToggleButton>
            </li>
            <li>
              <ToggleButton disableRipple sx={sidebarStyleObj} value="evidence">
                evidence
              </ToggleButton>
            </li>
            <li>
              <ToggleButton disableRipple sx={sidebarStyleObj} value="storage">
                evidence storage
              </ToggleButton>
            </li>
            <li>
              <ToggleButton disableRipple sx={sidebarStyleObj} value="tracking">
                tracking
              </ToggleButton>
            </li>
            <li>
              <ToggleButton
                disableRipple
                sx={sidebarStyleObj}
                value="documentation"
              >
                support
              </ToggleButton>
            </li>
          </ToggleButtonGroup>
        </ul>
        <div className={s.sidebarLogout}>
          <Button onClick={() => signOut()} variant="contained" color="warning">
            Sign Out
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${s.sidebarContainer} ${s.sidebarContainerFiller}`}>
        <h3>Built with:</h3>
        <ul>
          <li>Next.js 14</li>
          <li>Node.js</li>
          <li>Amazon S3</li>
          <li>TypeScript</li>
          <li>NextAuth</li>
          <li>MongoDB</li>
          <li>Prisma</li>
          <li>Zustand</li>
          <li>Material UI</li>
          <li>CSS Modules</li>
        </ul>
      </div>
    );
  }
};
export default Sidebar;
