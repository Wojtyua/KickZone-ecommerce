// app/_components/shop/FilteredProducts.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getProductByTargetGroup } from "@/app/_actions/productActions";
import ProductGrid from "./ProductGrid";
import FilterSidebar from "./FilterSidebar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import Spinner from "@/app/_components/Spinner";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { filterProducts } from "@/app/_utils/filterProducts";

export default function FilteredProducts({
  group,
}: {
  group: "men" | "women";
}) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const { data } = await getProductByTargetGroup(group);
    setProducts(data);
    setIsLoading(false);
  }, [group]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = filterProducts(products, {
        searchParams: Object.fromEntries(searchParams.entries()),
      });
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, searchParams]);

  const filterOptions = {
    brands: Array.from(new Set(products.map((p) => p.brand))),
    categories: Array.from(new Set(products.flatMap((p) => p.categories))),
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-64">
        <div className="hidden md:block">
          <FilterSidebar filterOptions={filterOptions} />
        </div>
        <div className="block md:hidden mb-4">
          <MobileFilterDrawer filterOptions={filterOptions} />
        </div>
      </div>
      <div className="flex-1">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
