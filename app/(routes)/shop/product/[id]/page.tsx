import { Suspense } from "react";
import { getProductById } from "@/app/_actions/productActions";
import ProductDetail from "@/app/_components/shop/ProductDetail";
import Spinner from "@/app/_components/Spinner";
import FavoriteButton from "@/app/_components/FavoriteButton";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: product } = await getProductById(params.id);
  return {
    title: `${product.product_model} | Our Shop`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product, success } = await getProductById(params.id);

  if (!success || !product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{product.product_model}</h1>
        <FavoriteButton productId={product._id} />
      </div>
      <Suspense fallback={<Spinner />}>
        <ProductDetail product={product} />
      </Suspense>
    </div>
  );
}
