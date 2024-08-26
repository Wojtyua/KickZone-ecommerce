"use client";

import { ProductType } from "@/app/_lib/mongodb/db.types";
import Image from "next/image";
import React, { useState } from "react";

type ProductDetailProps = {
  data: ProductType;
};

const ProductDetail: React.FC<ProductDetailProps> = ({
  data: { product_model, description, price, images, variants },
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <h1>{product_model}</h1>
      <p>{description}</p>
      <p>{`Price: $${price.toFixed(2)}`}</p>

      <div className="product-images">
        {images.map((image, index) => (
          <Image
            width={200}
            height={200}
            key={index}
            src={image}
            alt={product_model}
          />
        ))}
      </div>

      <div className="product-sizes">
        <h3>Select Size:</h3>
        <div className="sizes">
          {variants.map((variant) => (
            <button
              key={variant.size}
              onClick={() => handleSizeChange(variant.size)}
              disabled={variant.quantity === 0}
              className={`size-button ${
                selectedSize === variant.size ? "selected" : ""
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      <button disabled={!selectedSize} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
