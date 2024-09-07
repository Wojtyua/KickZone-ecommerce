import { getFeaturedProducts } from "@/app/_actions/productActions";
import ProductGrid from "@/app/_components/shop/ProductGrid";
import { ProductType } from "@/app/_lib/mongodb/db.types";

export default async function FeaturedProducts() {
  const { data: products } = await getFeaturedProducts();

  return <ProductGrid products={products} />;
}
