// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// import { db } from "@/lib/db";
// import authConfig from "@/auth.config";
// import { getUserByEmail, getUserById } from "./data/user";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   pages: {
//     signIn: "/login",
//     error: "/error",
//   },
//   adapter: PrismaAdapter(db),
//   secret: process.env.NEXT_AUTH_SECRET,
//   session: { strategy: "jwt" },
//   ...authConfig,
// });
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
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
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
});
