"use server";
import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import User from "@/app/_lib/mongodb/models/userModel";
import { hashPassword } from "@/app/_utils/passUtils";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

import { redirect } from "next/navigation";

export const registerUser = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please provide all the necessary information");
  }

  await connectToMongoDB();
  const user = await User.findOne({ email });

  if (user) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await User.create(newUser);
  console.log("User registered successfully");
  redirect("/login");
};

export const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};
