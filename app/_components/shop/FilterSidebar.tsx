// app/_components/shop/FilterSidebar.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FilterOptions = {
  brands: string[];
  categories: string[];
};

export default function FilterSidebar({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    brand: searchParams.getAll("brand"),
    category: searchParams.getAll("category"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    setFilters({
      brand: searchParams.getAll("brand"),
      category: searchParams.getAll("category"),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    });
  }, [searchParams]);

  const toggleFilter = useCallback(
    (type: "brand" | "category", value: string) => {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value],
      }));
    },
    []
  );

  const handlePriceChange = useCallback(
    (type: "minPrice" | "maxPrice", value: string) => {
      setFilters((prev) => ({ ...prev, [type]: value }));
    },
    []
  );

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      params.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filters, router, searchParams]);

  const resetFilters = useCallback(() => {
    router.push(".", { scroll: false });
  }, [router]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Brands</h3>
        <div className="mt-2 space-y-2">
          {filterOptions.brands.map((brand) => (
            <Toggle
              key={brand}
              pressed={filters.brand.includes(brand)}
              onPressedChange={() => toggleFilter("brand", brand)}
            >
              {brand}
            </Toggle>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">Categories</h3>
        <div className="mt-2 space-y-2">
          {filterOptions.categories.map((category) => (
            <Toggle
              key={category}
              pressed={filters.category.includes(category)}
              onPressedChange={() => toggleFilter("category", category)}
            >
              {category}
            </Toggle>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">Price Range</h3>
        <div className="mt-2 space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
          />
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
