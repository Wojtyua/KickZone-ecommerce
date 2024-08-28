import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import User from "@/app/_lib/mongodb/models/userModel";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin(
            "Please provide all the necessary information"
          );
        }

        await connectToMongoDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new Error("User not found");

        if (!user.password) throw new Error("Invalid emaild or password");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Password is incorrect");

        const userData = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          favorites: user.favorites,
          orders: user.orders,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
