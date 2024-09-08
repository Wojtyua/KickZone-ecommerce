"use server";
import Product from "@/app/_lib/mongodb/models/productModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { Types } from "mongoose";

type Placeholder = { success: boolean; message: string };
type GetProductResult = Placeholder & { data: ProductType[] };
type GetProductByIdResult = Placeholder & { data: ProductType };

type ProductResult = {
  success: boolean;
  message: string;
  data: ProductType[];
};

const serializeData = (data: any) => JSON.parse(JSON.stringify(data));

export async function getProductByTargetGroup(
  targetGroup: "men" | "women"
): Promise<ProductResult> {
  try {
    await connectToMongoDB();
    const products = await Product.find({ target_group: targetGroup }).lean();

    const serializedProducts = serializeData(products);

    return {
      success: true,
      message: `Products for ${targetGroup} fetched successfully`,
      data: serializedProducts,
    };
  } catch (error) {
    console.error(`Error fetching products for ${targetGroup}:`, error);
    return {
      success: false,
      message: `Failed to fetch products for ${targetGroup}`,
      data: [],
    };
  }
}

export async function getFeaturedProducts(): Promise<ProductResult> {
  try {
    await connectToMongoDB();
    const products = await Product.find({ featured: true }).limit(8).lean();

    const serializedProducts = serializeData(products);

    return {
      success: true,
      message: "Featured products fetched successfully",
      data: serializedProducts,
    };
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return {
      success: false,
      message: "Failed to fetch featured products",
      data: [],
    };
  }
}

export const getProductById = async (
  productId: string
): Promise<GetProductByIdResult> => {
  await connectToMongoDB();
  try {
    const product = await Product.findById(productId).lean();

    if (!product) {
      return {
        data: {} as ProductType,
        success: false,
        message: `Product not found with id: ${productId}`,
      };
    }

    const serializedProduct = serializeData(product);

    return {
      data: serializedProduct,
      success: true,
      message: "Successfully fetched product by Id",
    };
  } catch (error: any) {
    return {
      data: {} as ProductType,
      success: false,
      message: `Error fetching product: ${error.message}`,
    };
  }
};

export const createProduct = async (
  productData: ProductType
): Promise<Placeholder> => {
  await connectToMongoDB();
  try {
    const newProduct = await Product.create(productData);
    newProduct.save();
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

export const getAllProducts = async (): Promise<GetProductResult> => {
  await connectToMongoDB();
  try {
    const products: ProductType[] = await Product.find().lean();
    const serializedProducts = serializeData(products);
    return {
      data: serializedProducts,
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

export const decreaseProductQuantity = async (
  productId: string,
  variantSize: number,
  amount: number
): Promise<Placeholder> => {
  await connectToMongoDB();
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
