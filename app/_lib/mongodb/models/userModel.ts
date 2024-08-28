import mongoose, { Schema, model, Document } from "mongoose";

type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  favorites: {
    productId: string;
  }[];
  orders: {
    orderId: string;
  }[];
};

type UserDocument = UserType & Document;

const UserSchema = new Schema<UserDocument>(
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
    favorites: [{ type: String, required: false }],
    orders: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
