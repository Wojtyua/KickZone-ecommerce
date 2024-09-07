"use client";

import { useState, useEffect, useCallback } from "react";
import ProductCard from "@/app/_components/ProductCard";
import { filterProducts } from "@/app/_utils/filterProducts";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import Spinner from "@/app/_components/Spinner";

type ProductsListProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  products: ProductType[];
};

const ProductsList = ({ searchParams, products }: ProductsListProps) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const applyFilters = useCallback(() => {
    setIsLoading(true);
    const filtered = filterProducts(products, { searchParams });
    setFilteredProducts(filtered);
    setIsLoading(false);
  }, [products, searchParams]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (isLoading) {
    return <Spinner />;
  }

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
