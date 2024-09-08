"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { useCartStore } from "@/app/_store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FavoriteButton from "@/app/_components/FavoriteButton";

const ProductDetail: React.FC<{ product: ProductType }> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({
        id: product._id,
        model: product.product_model,
        price: product.price,
        size: selectedSize,
        imageUrl: product.images[0],
        quantity: 1,
      });
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    } else {
      toast({
        title: "Error",
        description: "Please select a size",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.product_model}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-md ${
                index === currentImageIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${product.product_model} thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.product_model}</h1>
        <p className="text-xl font-semibold mb-4">
          ${product.price.toFixed(2)}
        </p>
        <p className="mb-4">{product.description}</p>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Size:</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <Button
                key={variant.size}
                onClick={() => handleSizeChange(variant.size)}
                disabled={variant.quantity === 0}
                variant={selectedSize === variant.size ? "default" : "outline"}
              >
                {variant.size}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <Button onClick={handleAddToCart} disabled={!selectedSize}>
            Add to Cart
          </Button>
          <FavoriteButton productId={product._id} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Product Details:</h3>
          <ul className="list-disc list-inside">
            <li>Brand: {product.brand}</li>
            <li>Target Group: {product.target_group}</li>
            <li>Categories: {product.categories.join(", ")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
