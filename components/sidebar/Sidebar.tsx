"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/store/userSlice";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import s from "./styles.module.css";
import { Button } from "@mui/material";
import { Suspense } from "react";

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
      router.push(`/dashboard?view=${newView}`);
    }
  };

  if (status === "authenticated" && email) {
    return (
      <Suspense>
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
                <ToggleButton
                  disableRipple
                  sx={sidebarStyleObj}
                  value="overview"
                >
                  overview
                </ToggleButton>
              </li>
              <li>
                <ToggleButton disableRipple sx={sidebarStyleObj} value="case">
                  cases
                </ToggleButton>
              </li>
              <li>
                <ToggleButton
                  disableRipple
                  sx={sidebarStyleObj}
                  value="evidence"
                >
                  evidence
                </ToggleButton>
              </li>
              <li>
                <ToggleButton
                  disableRipple
                  sx={sidebarStyleObj}
                  value="storage"
                >
                  evidence storage
                </ToggleButton>
              </li>
              <li>
                <ToggleButton
                  disableRipple
                  sx={sidebarStyleObj}
                  value="tracking"
                >
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
            <Button onClick={() => signOut()} variant="contained" color="error">
              Sign Out
            </Button>
          </div>
        </div>
      </Suspense>
    );
  } else {
    return (
      <Suspense>
        <div className={`${s.sidebarContainer} ${s.sidebarContainerFiller}`}>
          <h3>Built with:</h3>
          <ul>
            <li>
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Next.js 14</Button>
              </a>
            </li>
            <li>
              <a
                href="https://nodejs.org/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Node.js</Button>
              </a>
            </li>
            <li>
              <a
                href="https://aws.amazon.com/s3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Amazon S3</Button>
              </a>
            </li>
            <li>
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">TypeScript</Button>
              </a>
            </li>
            <li>
              <a
                href="https://next-auth.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">NextAuth</Button>
              </a>
            </li>
            <li>
              <a
                href="https://www.mongodb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">MongoDB</Button>
              </a>
            </li>
            <li>
              <a
                href="https://www.prisma.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Prisma</Button>
              </a>
            </li>
            <li>
              <a
                href="https://docs.pmnd.rs/zustand/getting-started/introduction"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Zustand</Button>
              </a>
            </li>
            <li>
              <a
                href="https://mui.com/material-ui/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Material UI</Button>
              </a>
            </li>
            <li>
              <a
                href="https://recharts.org/en-US/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">Recharts</Button>
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined">CSS Modules</Button>
              </a>
            </li>
          </ul>
        </div>
      </Suspense>
    );
  }
};
export default Sidebar;
