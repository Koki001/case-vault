import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "./data/user";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      id: "badge-login",
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUserByEmail(email as any);
        console.log(user);
        if (!user || !user.password) return null;

        const passwordsMatch = await compare(
          password as string,
          user?.password
        );
        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
});
