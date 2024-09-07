import ProductCard from "./ProductCard";
import { ProductType } from "@/app/_lib/mongodb/db.types";

export default function ProductGrid({ products }: { products: ProductType[] }) {
  if (products.length === 0) {
    return <p className="text-center">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
