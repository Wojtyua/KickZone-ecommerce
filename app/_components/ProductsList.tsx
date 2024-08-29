import { getProductByTargetGroup } from "@/app/_actions/productActions";
import ProductCard from "@/app/_components/ProductCard";
import { filterProducts } from "@/app/_utils/filterProducts";

type ProductsListProps = {
  target: "men" | "women";
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProductsList = async ({ target, searchParams }: ProductsListProps) => {
  // Pobierz produkty na podstawie targetu
  const { data: products } = await getProductByTargetGroup(target);

  // Przefiltruj produkty na podstawie searchParams
  const filteredProducts = filterProducts(products, { searchParams });

  // Jeśli brak wyników, wyświetl wiadomość
  if (filteredProducts.length === 0) {
    return <p>No products found matching your criteria.</p>;
  }

  return (
    <main className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </main>
  );
};

export default ProductsList;
