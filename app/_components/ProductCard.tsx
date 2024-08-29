import { ProductType } from "@/app/_lib/mongodb/db.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="bg-secondary-950 overflow-hidden">
      <CardContent>
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt="{product.product_model} image"
            className="object-cover mix-blend-darken hover:scale-105 transition-transform"
            width={400}
            height={400}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">{product.product_model}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between ">
        <div className="text-lg font-bold">${product.price}</div>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
