import { getProductByTargetGroup } from "@/app/_actions/productActions";
import { filterProducts } from "@/app/_utils/filterProducts";
import Image from "next/image";
import Link from "next/link";

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
    <main className="grid grid-cols-2 md:grid-cols-3">
      {filteredProducts.map((product) => (
        <div key={product.product_model}>
          <Image
            src={product.images[0]}
            width={200}
            height={200}
            alt={product.product_model}
          />
          <Link href={`shop/${product._id}`}>{product.product_model}</Link>
        </div>
      ))}
    </main>
  );
};

export default ProductsList;
