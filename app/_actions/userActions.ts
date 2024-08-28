"use server";
import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import { UserType } from "@/app/_lib/mongodb/db.types";
import User from "@/app/_lib/mongodb/models/userModel";
import bcrypt from "bcryptjs";

export const registerUser = async (values: any) => {
  const { email, password, firstName, lastName } = values;
  try {
    await connectToMongoDB();
    // Check if the user already exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        satisfies: false,
        msg: "Email already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    return {
      satisfies: true,
      msg: "User registered successfully",
    };
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (email: string): Promise<UserType> => {
  await connectToMongoDB();
  const user: UserType | null = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
