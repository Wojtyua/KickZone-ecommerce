import mongoose, { Schema, model, Document } from "mongoose";
import { ProductType } from "@/app/_lib/mongodb/db.types";

export interface OrderType {
  orderId: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    size: number;
  }[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

export interface UserType extends Document {
  email: string;
  password: string;
  name: string;
  favoriteProducts: mongoose.Types.ObjectId[] | ProductType[];
  orders: OrderType[];
}

const OrderSchema = new Schema<OrderType>({
  orderId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      size: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true }, // Zmienione z 'amount' na 'totalAmount'
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "completed",
  },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: { type: String, required: true, select: false },
    name: { type: String, required: [true, "Name is required"] },
    favoriteProducts: [{ type: String, ref: "Product" }],
    orders: [OrderSchema],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model<UserType>("User", UserSchema);
export default User;
