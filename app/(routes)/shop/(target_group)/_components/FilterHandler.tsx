"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Filters = {
  brand: string[];
  category: string[];
  minPrice: string;
  maxPrice: string;
};

type FilterOptions = {
  brands: string[];
  categories: string[];
};

const FilterHandler = ({
  initialFilters,
  filterOptions,
}: {
  initialFilters: { [key: string]: string | string[] | undefined };
  filterOptions: FilterOptions;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => ({
    brand: Array.isArray(initialFilters.brand)
      ? initialFilters.brand
      : initialFilters.brand
      ? [initialFilters.brand]
      : [],
    category: Array.isArray(initialFilters.category)
      ? initialFilters.category
      : initialFilters.category
      ? [initialFilters.category]
      : [],
    minPrice: initialFilters.minPrice?.toString() || "",
    maxPrice: initialFilters.maxPrice?.toString() || "",
  }));

  const toggleFilter = (filterName: "brand" | "category", value: string) => {
    setFilters((prev) => {
      const current = prev[filterName];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [filterName]: updated };
    });
  };

  const handleInputChange = (
    filterName: "minPrice" | "maxPrice",
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      brand: [],
      category: [],
      minPrice: "",
      maxPrice: "",
    });
    router.push(window.location.pathname);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Select what you looking for</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div>
          <Label>Brands</Label>
          <div className="flex gap-1 flex-wrap rounded-lg py-2">
            {filterOptions.brands.map((brand) => (
              <Toggle
                key={brand}
                pressed={filters.brand.includes(brand)}
                onPressedChange={() => toggleFilter("brand", brand)}
                size="xs"
                variant="outline"
              >
                {brand}
              </Toggle>
            ))}
          </div>
        </div>
        <div>
          <Label>Categories</Label>
          <div className="flex flex-wrap gap-1 rounded-lg py-2">
            {filterOptions.categories.map((category) => (
              <Toggle
                key={category}
                pressed={filters.category.includes(category)}
                onPressedChange={() => toggleFilter("category", category)}
                size="xs"
                variant="outline"
              >
                {category}
              </Toggle>
            ))}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div>
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              className="bg-accent-950"
              id="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleInputChange("minPrice", e.target.value)}
              placeholder="Min Price"
            />
          </div>
          <div>
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleInputChange("maxPrice", e.target.value)}
              placeholder="Max Price"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button onClick={applyFilters}>Apply filters</Button>
        <Button className="w-full" variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilterHandler;
