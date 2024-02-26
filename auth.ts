import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ token, session }) {
      console.log(token, session);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
      }

      return session;
    },
  },
  // adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
