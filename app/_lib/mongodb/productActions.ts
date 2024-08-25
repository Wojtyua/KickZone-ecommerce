"use server";
import Product from "@/app/_lib/mongodb/models/productModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { Types } from "mongoose";
import { shoesData } from "@/data";

type ProductResult = { success: boolean; message: string };
type GetProductResult = ProductResult & { data: ProductType[] };

export async function addShoesToDatabase() {
  try {
    // Połączenie z MongoDB
    await connectToMongoDB();

    // Iteracja po każdym elemencie w danych butów i dodanie ich do bazy danych
    for (const shoe of shoesData) {
      const newProduct = new Product(shoe);
      await newProduct.save();
      console.log(`Product added: ${newProduct.product_model}`);
    }

    console.log("All products have been added successfully.");
  } catch (error) {
    console.error("Error adding products to database:", error);
  }
}

// this needs use client to work
export const createProduct = async (
  productData: ProductType
): Promise<ProductResult> => {
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
    // Saving the new product to the database
    newProduct.save();

    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    return {
      success: true,
      message: `Product created successfully: ${newProduct.toString()}`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error creating product: ${error.message}`,
    };
  }
};

// use client not necessary(only if you want this on click)
export const getAllProducts = async (): Promise<GetProductResult> => {
  try {
    const products: ProductType[] = await Product.find();
    return {
      data: products,
      success: true,
      message: `All products fetched successfully`,
    };
  } catch (error: any) {
    return {
      data: [],
      success: false,
      message: `Error fetching all products: ${error.message}`,
    };
  }
};

export const getProductByTargetGroup = async (
  targetGroup: "men" | "women"
): Promise<GetProductResult> => {
  try {
    const products: ProductType[] = await Product.find({
      target_group: targetGroup,
    });
    return {
      data: products,
      success: true,
      message: `Products fetched by target group successfully`,
    };
  } catch (error: any) {
    return {
      data: [],
      success: false,
      message: `Error fetching products by target group: ${error.message}`,
    };
  }
};

export const decreaseProductQuantity = async (
  productId: string,
  variantSize: number,
  amount: number
): Promise<ProductResult> => {
  try {
    if (amount <= 0) {
      return { success: false, message: "Amount must be greater than 0" };
    }

    const product = await Product.findOneAndUpdate(
      {
        _id: new Types.ObjectId(productId),
        variants: {
          $elemMatch: {
            size: variantSize,
            quantity: { $gte: amount },
          },
        },
      },
      {
        $inc: {
          "variants.$.quantity": -amount,
        },
      },
      { new: true }
    );
    if (!product) {
      return {
        success: false,
        message: "Product or variant not found, or insufficient quantity",
      };
    }
    return { success: true, message: "Quantity updated successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: `Error decreasing product quantity: ${error.message}`,
    };
  }
};
