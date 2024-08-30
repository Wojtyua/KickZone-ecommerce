import ProductCard from "@/app/_components/ProductCard";
import { filterProducts } from "@/app/_utils/filterProducts";
import { ProductType } from "@/app/_lib/mongodb/db.types";

type ProductsListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  products: ProductType[];
};

const ProductsList = ({ searchParams, products }: ProductsListProps) => {
  const filteredProducts = filterProducts(products, { searchParams });

  if (filteredProducts.length === 0) {
    return <p>No products found matching your criteria.</p>;
  }

  return (
    <main className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {filteredProducts.map((product: ProductType) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </main>
  );
};

export default ProductsList;
