import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);

      return true;
    },
  },
  providers: [
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials;
    //     const user = await getUserByEmail(email as any);
    //     if (!user || !user.password) return null;
    //     const passwordsMatch = await bcrypt.compare(
    //       password as string,
    //       user?.password
    //     );
    //     if (passwordsMatch) return user;
    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;
