// app/_components/shop/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/app/_lib/mongodb/db.types";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/shop/product/${product._id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={product.images[0]}
          alt={product.product_model}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          width={300}
          height={300}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.product_model}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ${product.price.toFixed(2)}
      </p>
    </Link>
  );
}
