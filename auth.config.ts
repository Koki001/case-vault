import type { NextAuthConfig } from "next-auth";
// import { NextResponse, userAgent } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, headers } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (nextUrl.pathname === "/") return true;
      // currently don't allow to create new users
      if (nextUrl.pathname === "/register") {
        return Response.redirect(new URL("/login", nextUrl));
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
