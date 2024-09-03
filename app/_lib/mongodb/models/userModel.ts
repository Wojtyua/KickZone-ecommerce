// app/_lib/mongodb/models/userModel.ts

import mongoose, { Schema, model, Document } from "mongoose";

export interface UserType extends Document {
  email: string;
  password: string;
  name: string;
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
    name: { type: String, required: [true, "Name is required"] },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model<UserType>("User", UserSchema);
export default User;
