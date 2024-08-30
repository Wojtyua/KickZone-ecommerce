"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";

const FilterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Stan komponentu, przechowuje wybrane filtry (tablica kategorii)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Funkcja obsługi wyboru kategorii
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  // Funkcja obsługi aplikacji filtrów
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    // Najpierw usuwamy istniejące parametry "category"
    params.delete("category");

    // Dodajemy każdą wybraną kategorię do URL
    selectedCategories.forEach((category) => {
      params.append("category", category);
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Funkcja obsługi resetowania filtrów
  const handleReset = () => {
    setSelectedCategories([]);
    router.replace(pathname); // Usuwa wszystkie parametry z URL
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
        <CardDescription>Select categories you want</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFilter}>
          <Label htmlFor="category">Category</Label>
          <div className="space-x-2">
            <Toggle
              variant="outline"
              size="xs"
              id="running"
              name="category"
              pressed={selectedCategories.includes("running")}
              onClick={() => handleCategoryToggle("running")}
            >
              Running
            </Toggle>
            <Toggle
              variant="outline"
              size="xs"
              id="casual"
              name="category"
              pressed={selectedCategories.includes("casual")}
              onClick={() => handleCategoryToggle("casual")}
            >
              Casual
            </Toggle>
            <Toggle
              variant="outline"
              size="xs"
              id="lifestyle"
              name="category"
              pressed={selectedCategories.includes("lifestyle")}
              onClick={() => handleCategoryToggle("lifestyle")}
            >
              Lifestyle
            </Toggle>
            <Toggle
              variant="outline"
              size="xs"
              id="performance"
              name="category"
              pressed={selectedCategories.includes("performance")}
              onClick={() => handleCategoryToggle("performance")}
            >
              Performance
            </Toggle>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button size="sm" type="submit">
              Apply filter
            </Button>
            <Button
              size="sm"
              variant="secondary"
              type="button"
              onClick={handleReset}
            >
              Reset filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FilterForm;
