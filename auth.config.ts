import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";

export default {
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        // const user = await getUserByEmail(email as any);

        if (typeof email === "string") {
          const user = await db.user.findUnique({ where: { email } });

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password as string,
            user?.password
          );
          if (passwordsMatch) {
            return user;
          } else return null;
        } else return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
