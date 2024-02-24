"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

import { useUserStore } from "@/store/userSlice";

import Overview from "@/components/dashboard/overview/Overview";
import Evidence from "@/components/dashboard/evidence/Evidence";
import Case from "@/components/dashboard/case/Case";
import Storage from "@/components/dashboard/storage/Storage";
import Tracking from "@/components/dashboard/tracking/Tracking";
import Documentation from "@/components/dashboard/documentation/Documentation";
import Loader from "@/components/loader/Loader";
import { useSearchParams } from "next/navigation";

import s from "./page.module.css";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "overview";
  const { data: session, status } = useSession();
  const { email: userEmail, setUser } = useUserStore((state) => state);

  const componentObj = {
    overview: <Overview />,
    evidence: <Evidence />,
    case: <Case />,
    storage: <Storage />,
    tracking: <Tracking />,
    documentation: <Documentation />,
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email && !userEmail) {
        try {
          const res = await fetch("api/getUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
          });
          const userData = await res.json();
          setUser(
            userData.firstName || "",
            userData.lastName || "",
            userData.email || "",
            userData.badgeNumber || ""
          );
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [session?.user?.email, userEmail, setUser]);

  // if (status === "authenticatedd" && userEmail) {
  return (
    <div className={s.viewContainer}>
      {status === "authenticated" && userEmail ? (
        currentView && componentObj[currentView as keyof typeof componentObj]
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
  // } else return ;
};

export default DashboardPage;
