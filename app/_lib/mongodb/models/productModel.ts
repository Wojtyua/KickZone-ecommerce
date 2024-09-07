import mongoose, { Schema, Model, Document } from "mongoose";
import { ProductType } from "@/app/_lib/mongodb/db.types";

const ProductSchema = new Schema<ProductType>(
  {
    product_model: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    featured: { type: Boolean, default: false },
    target_group: { type: String, enum: ["men", "women"], required: true },
    categories: [{ type: String }],
    images: [{ type: String }],
    variants: [
      {
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Product: Model<ProductType> =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
