"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/store/userSlice";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import s from "./styles.module.css";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";
import { Suspense, useEffect, useRef, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavStore } from "../../store/burgerSlice";

const sidebarStyleObj = {
  "&.MuiButtonBase-root": {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    fontWeight: "bolder",
    borderRadius: "3px",
    margin: "0",
    height: "100%",
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

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams?.get("view") || "overview";
  const [openCases, setOpenCases] = useState(false);
  const [openEvidence, setOpenEvidence] = useState(false);
  const casesRef = useRef<HTMLButtonElement>(null);
  const evidenceRef = useRef<HTMLButtonElement>(null);

  const { data: session, status } = useSession();
  const { firstName, lastName, email, badgeNumber } = useUserStore();
  const showNav = useNavStore((state) => state.loading);
  const setShowNav = useNavStore((state) => state.setLoading);

  const handleToggle = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) {
      if (ref.current.id === "cases-menu") {
        setOpenCases((prev) => !prev);
        setOpenEvidence(false);
      } else if (ref.current.id === "evidence-menu") {
        setOpenEvidence((prev) => !prev);
        setOpenCases(false);
      }
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      (casesRef.current &&
        casesRef.current.contains(event.target as HTMLElement)) ||
      (evidenceRef.current &&
        evidenceRef.current.contains(event.target as HTMLElement))
    ) {
      return;
    }

    const clickedMenuItem = (event.target as HTMLElement).textContent;

    if (clickedMenuItem === "Add") {
      if (openCases) {
        router.push(`?view=case&caseOptions=createCase`);
        setShowNav(false);
      } else if (openEvidence) {
        router.push(`?view=evidence&evidenceOptions=uploadEvidence`);
        setShowNav(false);
      }
    } else if (clickedMenuItem === "View") {
      if (openCases) {
        router.push(`?view=case&caseOptions=viewCases`);
        setShowNav(false);
      } else if (openEvidence) {
        router.push(`?view=evidence&evidenceOptions=viewEvidence`);
        setShowNav(false);
      }
    }

    setOpenCases(false);
    setOpenEvidence(false);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView !== null) {
      setShowNav(false);
      router.push(`/dashboard?view=${newView}`);
    }
  };

  if (status === "authenticated" && email) {
    return (
      <Suspense>
        <div
          className={
            showNav
              ? `${s.navContainer} ${s.navContainerMobile}`
              : `${s.navContainer}`
          }
        >
          <div className={`${s.navWrapper} wrapper`}>
            <div className={s.navUserInfo}>
              <CircleIcon color="success" />
              <div className={s.navUserInfoName}>
                <h3>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
                </h3>
                <h4>#{badgeNumber}</h4>
              </div>
            </div>
            <ul className={s.navContent}>
              <ToggleButtonGroup
                color="primary"
                orientation="horizontal"
                value={currentView}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <li>
                  <ToggleButton
                    disableRipple
                    sx={{ ...sidebarStyleObj, color: "black" }}
                    value="overview"
                  >
                    overview
                  </ToggleButton>
                </li>
                <li>
                  <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
                    <div>
                      <Button
                        disableRipple
                        ref={casesRef}
                        id="cases-menu"
                        aria-controls={
                          openCases ? "composition-menu" : undefined
                        }
                        aria-expanded={openCases ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={() => handleToggle(casesRef)}
                        sx={{
                          ...sidebarStyleObj,
                          backgroundColor:
                            currentView === "case" ? "#01579b" : "white",
                          color: currentView === "case" ? "white" : "black",
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Cases
                      </Button>
                      <Popper
                        open={openCases}
                        anchorEl={casesRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        sx={{ width: "120px", zIndex: "100" }}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom-start"
                                  ? "left top"
                                  : "left bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={openCases}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  sx={{ position: "relative" }}
                                >
                                  <AddIcon
                                    sx={{
                                      position: "absolute",
                                      right: "15px",
                                      top: "13px",
                                    }}
                                  />
                                  <SearchIcon
                                    sx={{
                                      position: "absolute",
                                      right: "15px",
                                      bottom: "13px",
                                    }}
                                  />
                                  <MenuItem onClick={handleClose}>Add</MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    View
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </Stack>
                </li>
                <li>
                  <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
                    <div>
                      <Button
                        disableRipple
                        ref={evidenceRef}
                        id="evidence-menu"
                        aria-controls={
                          openEvidence ? "composition-menu" : undefined
                        }
                        aria-expanded={openEvidence ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={() => handleToggle(evidenceRef)}
                        sx={{
                          ...sidebarStyleObj,
                          backgroundColor:
                            currentView === "evidence" ? "#01579b" : "white",
                          color: currentView === "evidence" ? "white" : "black",
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Evidence
                      </Button>
                      <Popper
                        open={openEvidence}
                        anchorEl={evidenceRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        sx={{ width: "120px", zIndex: "100" }}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom-start"
                                  ? "left top"
                                  : "left bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={openEvidence}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  sx={{ position: "relative" }}
                                >
                                  <AddIcon
                                    sx={{
                                      position: "absolute",
                                      right: "15px",
                                      top: "13px",
                                    }}
                                  />
                                  <SearchIcon
                                    sx={{
                                      position: "absolute",
                                      right: "15px",
                                      bottom: "13px",
                                    }}
                                  />
                                  <MenuItem onClick={handleClose}>Add</MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    View
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </Stack>
                </li>
                <li>
                  <ToggleButton
                    disableRipple
                    sx={{ ...sidebarStyleObj, color: "black" }}
                    value="storage"
                  >
                    storage
                  </ToggleButton>
                </li>
                <li>
                  <ToggleButton
                    disableRipple
                    sx={{ ...sidebarStyleObj, color: "black" }}
                    value="tracking"
                  >
                    tracking
                  </ToggleButton>
                </li>
                <li>
                  <ToggleButton
                    disableRipple
                    sx={{ ...sidebarStyleObj, color: "black" }}
                    value="documentation"
                  >
                    support
                  </ToggleButton>
                </li>
              </ToggleButtonGroup>
            </ul>
            <div className={s.navLogout}>
              <Button
                onClick={() => signOut()}
                variant="contained"
                color="error"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </Suspense>
    );
  } else {
    return (
      <Suspense>
        <div className={`${s.navContainer} ${s.navContainerFiller}`}>
          <ul className="wrapper">
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
export default Navbar;
