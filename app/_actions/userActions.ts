"use server";

import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import User from "@/app/_lib/mongodb/models/userModel";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth"; // Importuj signIn z twojego pliku auth.ts

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    await connectToMongoDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create new user
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred" };
  }
}
