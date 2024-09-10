"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSidebar from "./FilterSidebar";

type FilterOptions = {
  brands: string[];
  categories: string[];
};

export default function MobileFilterDrawer({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Select what you are interested in</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <FilterSidebar filterOptions={filterOptions} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
