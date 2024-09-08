"use server";

import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import User from "@/app/_lib/mongodb/models/userModel";
import Product from "@/app/_lib/mongodb/models/productModel";
import { auth } from "@/auth";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { UserType } from "@/app/_lib/mongodb/models/userModel";

const serializeDocument = (doc: any) => {
  return JSON.parse(JSON.stringify(doc));
};

export async function getFavorites() {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "User not authenticated", data: [] };
  }

  try {
    await connectToMongoDB();
    const user = (await User.findOne({
      email: session.user.email,
    }).lean()) as UserType;

    if (!user) {
      return { success: false, message: "User not found", data: [] };
    }

    const favoriteProducts = (await Product.find({
      _id: { $in: user.favoriteProducts },
    }).lean()) as ProductType[];

    const serializedFavorites = serializeDocument(favoriteProducts);

    return {
      success: true,
      message: "Favorites fetched successfully",
      data: serializedFavorites,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      data: [],
    };
  }
}

export async function addToFavorites(productId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    await connectToMongoDB();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $addToSet: { favoriteProducts: productId } },
      { new: true }
    );

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "Product added to favorites" };
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function removeFromFavorites(productId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    await connectToMongoDB();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $pull: { favoriteProducts: productId } },
      { new: true }
    );

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "Product removed from favorites" };
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
