import mongoose, { Schema, model, Document } from "mongoose";

type FavoriteType = {
  productId: string;
};

type OrderType = {
  orderId: string;
};

export interface UserType extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  favorites: FavoriteType[];
  orders: OrderType[];
}

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
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    favorites: [{ productId: { type: String } }],
    orders: [{ orderId: { type: String } }],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model<UserType>("User", UserSchema);
export default User;
