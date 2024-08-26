"use client";

import { ProductType } from "@/app/_lib/mongodb/db.types";

type ProductDetailProps = {
  data: ProductType;
};

const ProductDetail = ({ data }: ProductDetailProps) => {
  return <div>{data.product_model}</div>;
};

export default ProductDetail;
