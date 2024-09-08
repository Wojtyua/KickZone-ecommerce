import { Suspense } from "react";
import { getFavorites } from "@/app/_actions/favoriteActions";
import ProductGrid from "@/app/_components/shop/ProductGrid";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Favorite Products | Our Shop",
  description: "View and manage your favorite products",
};

async function FavoriteProducts() {
  const { success, data: products } = await getFavorites();

  if (!success || products.length === 0) {
    return <p>You haven&apos;t added any products to your favorites yet.</p>;
  }

  return <ProductGrid products={products} />;
}

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Products</h1>
      <Suspense fallback={<Spinner />}>
        <FavoriteProducts />
      </Suspense>
    </div>
  );
}
