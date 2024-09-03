import { ProductType } from "@/app/_lib/mongodb/db.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = async ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <Image
          src={product.images[0]}
          alt="{product.product_model} image"
          width={300}
          height={300}
          className="h-auto w-auto rounded-md object-cover"
          priority
        />

        <div className="space-y-1">
          <Link href={`/shop/${product._id}`}>
            <h3 className="text-lg font-semibold hover:underline">
              {product.product_model}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <div className="space-x-1">
            {product.categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pb-3 ">
        <div className="text-xl font-bold">${product.price}</div>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
