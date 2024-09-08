import mongoose, { Schema, model, Document } from "mongoose";

export interface UserType extends Document {
  email: string;
  password: string;
  name: string;
  favoriteProducts: string[];
  orderHistory: OrderType[];
}

export interface OrderType {
  orderId: string;
  date: Date;
  products: {
    productId: string;
    quantity: number;
    size: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

const OrderSchema = new Schema<OrderType>({
  orderId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
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
    orderHistory: [OrderSchema],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model<UserType>("User", UserSchema);
export default User;
