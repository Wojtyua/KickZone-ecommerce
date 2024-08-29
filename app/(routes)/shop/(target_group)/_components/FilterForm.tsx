import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const FilterForm = () => {
  return (
    <Card className="bg-secondary-900 h-fit">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
        <CardDescription>Filter your search</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search for products"
            type="text"
            name="search"
          />
          <Label htmlFor="category">Category</Label>
          <Link
            href={{
              pathname: "/shop/mens",
              query: { category: "running" },
            }}
          >
            test
          </Link>
          <Button>Filter &rarr;</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FilterForm;
