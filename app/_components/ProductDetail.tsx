"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { useCartStore } from "@/app/_store";

type ProductDetailProps = {
  data: ProductType;
};

const ProductDetail: React.FC<ProductDetailProps> = ({
  data: { _id, product_model, description, price, images, variants },
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addItem } = useCartStore();

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({
        id: _id,
        model: product_model,
        price,
        size: selectedSize,
        imageUrl: images[0],
        quantity: 1,
      });
    }
  };

  return (
    <div>
      <h1>{product_model}</h1>
      <p>{description}</p>
      <p>{`Price: $${price.toFixed(2)}`}</p>

      <div>
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

      <div>
        <h3>Select Size:</h3>
        <div className="flex gap-2">
          {variants.map((variant) => (
            <button
              key={variant.size}
              onClick={() => handleSizeChange(variant.size)}
              disabled={variant.quantity === 0}
              className={`size-12 border ${
                selectedSize === variant.size ? "border-red-400" : ""
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!selectedSize}
        onClick={handleAddToCart}
        className="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
