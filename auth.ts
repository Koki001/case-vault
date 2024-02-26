import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
// import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  // pages: {
  //   signIn: "/login",
  //   error: "/error",
  // },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUserByEmail(email as any);

        if (!user || !user.password) return null;

        const passwordsMatch = await compare(
          password as string,
          user?.password
        );
        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  // callbacks: {
  // async session({ token, session }) {
  //   console.log(token, session);

  //   if (token.sub && session.user) {
  //     session.user.id = token.sub;
  //   }
  //   if (session.user) {
  //     session.user.name = token.name;
  //   }

  //   return session;
  // },
  // },
  // adapter: PrismaAdapter(db),
  // session: { strategy: "jwt" },
});
