import { Suspense } from "react";
import FeaturedProducts from "@/app/_components/shop/FeaturedProducts";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Featured Products | Our Shop",
  description: "Check out our featured products",
};

export default function ShopPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <Suspense fallback={<Spinner />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
