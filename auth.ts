import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import User from "@/app/_lib/mongodb/models/userModel";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectToMongoDB();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordCorrect) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          favoriteProducts: user.favoriteProducts || [],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.favoriteProducts = user.favoriteProducts;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.favoriteProducts =
          (token.favoriteProducts as string[]) || [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
