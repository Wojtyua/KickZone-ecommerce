import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUser } from "@/app/_actions/userActions";
import { verifyPassword } from "@/app/_utils/passUtils";

type Credentials = {
  email: string;
  password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as Credentials;
          let user = null;

          user = await getUser(email);
          if (!user) throw new Error("User not found");

          const isValidPassword = await verifyPassword(password, user.password);

          if (!isValidPassword) throw new Error("Wrong Password");
          return user;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
});
