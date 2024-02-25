import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getUserByEmail(email as any);
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user?.password
        );
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
