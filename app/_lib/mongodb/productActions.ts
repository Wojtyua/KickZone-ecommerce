"use server";
import Product from "@/app/_lib/mongodb/models/productModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import { ProductType } from "@/app/_lib/mongodb/db.types";

export const createProduct = async (productData: ProductType) => {
  await connectToMongoDB();

  try {
    // Creating a new todo using Todo model
    const newProduct = await Product.create({
      product_model: productData.product_model,
      brand: productData.brand,
      price: productData.price,
      description: productData.description,
      featured: productData.featured,
      target_group: productData.target_group,
      categories: productData.categories,
      images: productData.images,
      variants: productData.variants,
    });
    // Saving the new todo
    newProduct.save();
    console.log("product created");
    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    // Returning the string representation of the new todo
    return newProduct.toString();
  } catch (error) {
    console.log(error);
    return { message: "error creating product" };
  }
};
