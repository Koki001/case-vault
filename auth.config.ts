// import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { getUserByEmail } from "./data/user";
// import bcrypt from "bcryptjs";

// export default {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         const user = await getUserByEmail(email as any);
//         console.log(user)
//         if (!user || !user.password) return null;

//         const passwordsMatch = await bcrypt.compare(
//           password as string,
//           user?.password
//         );
//         if (passwordsMatch) return user;

//         return null;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log("isLoggedin", isLoggedIn)
      console.log("isOnDashboard", isOnDashboard)
      console.log("auth", auth)
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
