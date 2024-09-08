"use server";

import { connectToMongoDB } from "@/app/_lib/mongodb/db";
import User, { UserType, OrderType } from "@/app/_lib/mongodb/models/userModel";
import { auth } from "@/auth";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  size: number;
}

interface OrderData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  totalAmount: number;
}

export async function createOrder(orderData: OrderData) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    await connectToMongoDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      ...orderData,
      status: "completed",
      createdAt: new Date(),
    };

    user.orders.push(newOrder);
    await user.save();

    return {
      success: true,
      message: "Order created successfully",
      orderId: newOrder.orderId,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function getOrderHistory() {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "User not authenticated", data: [] };
  }

  try {
    await connectToMongoDB();
    const user = (await User.findOne({ email: session.user.email })
      .select("orders")
      .lean()) as UserType;

    if (!user) {
      return { success: false, message: "User not found", data: [] };
    }

    return {
      success: true,
      message: "Order history fetched successfully",
      data: user.orders as OrderType[],
    };
  } catch (error) {
    console.error("Error fetching order history:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      data: [],
    };
  }
}
