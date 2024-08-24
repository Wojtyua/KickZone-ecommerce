import mongoose, { Schema, Model, Document } from "mongoose";
import { ProductType } from "@/app/_lib/mongodb/db.types";

// extends Product type with Document to add mongoose methods
type ProductDocument = ProductType & Document;

const ProductSchema = new Schema<ProductDocument>(
  {
    product_model: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    featured: { type: Boolean, default: false },
    target_group: { type: String },
    categories: [{ type: String }], // array of strings for categories
    images: [{ type: String }], // array of strings for image URLs
    variants: [
      {
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ], // array of objects for variants
  },
  { timestamps: true }
);

const Product = (Model<ProductDocument> =
  mongoose.models?.Product || mongoose.model("Product", ProductSchema));

export default Product;
