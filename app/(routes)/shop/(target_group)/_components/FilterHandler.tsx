"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import debounce from "lodash/debounce";

type Filters = {
  brand?: string[];
  category?: string[];
  minPrice?: string;
  maxPrice?: string;
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
  const [filters, setFilters] = useState<Filters>(() => {
    const initFilters: Filters = {};
    if (initialFilters.brand)
      initFilters.brand = Array.isArray(initialFilters.brand)
        ? initialFilters.brand
        : [initialFilters.brand];
    if (initialFilters.category)
      initFilters.category = Array.isArray(initialFilters.category)
        ? initialFilters.category
        : [initialFilters.category];
    if (initialFilters.minPrice)
      initFilters.minPrice = initialFilters.minPrice.toString();
    if (initialFilters.maxPrice)
      initFilters.maxPrice = initialFilters.maxPrice.toString();
    return initFilters;
  });

  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (Array.isArray(value)) {
        params.delete(name);
        value.forEach((v) => params.append(name, v));
      } else if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const updateFilters = useCallback(
    (filterName: keyof Filters, value: string | string[]) => {
      setFilters((prev) => {
        if (Array.isArray(prev[filterName])) {
          const updatedArray = prev[filterName] as string[];
          if (updatedArray.includes(value as string)) {
            return {
              ...prev,
              [filterName]: updatedArray.filter((v) => v !== value),
            };
          } else {
            return {
              ...prev,
              [filterName]: [...updatedArray, value as string],
            };
          }
        }
        return { ...prev, [filterName]: value };
      });
    },
    []
  );

  useEffect(() => {
    const debouncedUpdateUrl = debounce(() => {
      let query = "";
      Object.entries(filters).forEach(([key, value]) => {
        if (value && (Array.isArray(value) ? value.length > 0 : value)) {
          query = createQueryString(key, value);
        }
      });
      router.push(`?${query}`);
    }, 500);

    debouncedUpdateUrl();
    return () => debouncedUpdateUrl.cancel();
  }, [filters, createQueryString, router]);

  return (
    <div className="space-y-4">
      <div>
        <Label>Brands</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {filterOptions.brands.map((brand) => (
            <Toggle
              key={brand}
              pressed={filters.brand?.includes(brand)}
              onPressedChange={() => updateFilters("brand", brand)}
              size="sm"
            >
              {brand}
            </Toggle>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {filterOptions.categories.map((category) => (
            <Toggle
              key={category}
              pressed={filters.category?.includes(category)}
              onPressedChange={() => updateFilters("category", category)}
              size="sm"
            >
              {category}
            </Toggle>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            value={filters.minPrice || ""}
            onChange={(e) => updateFilters("minPrice", e.target.value)}
            placeholder="Min Price"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            value={filters.maxPrice || ""}
            onChange={(e) => updateFilters("maxPrice", e.target.value)}
            placeholder="Max Price"
          />
        </div>
      </div>
    </div>
  );
};
export default FilterHandler;
