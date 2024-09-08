import { ProductType } from "@/app/_lib/mongodb/db.types";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export function filterProducts(
  products: ProductType[],
  { searchParams }: { searchParams: SearchParams }
): ProductType[] {
  const brandFilter = searchParams.brand
    ? Array.isArray(searchParams.brand)
      ? searchParams.brand
      : [searchParams.brand]
    : [];
  const categoryFilter = searchParams.category
    ? Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]
    : [];
  const minPrice = Number(searchParams.minPrice) || 0;
  const maxPrice = Number(searchParams.maxPrice) || Infinity;

  return products.filter((product) => {
    const brandMatch =
      brandFilter.length === 0 || brandFilter.includes(product.brand);
    const categoryMatch =
      categoryFilter.length === 0 ||
      product.categories.some((cat) => categoryFilter.includes(cat));
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;

    return brandMatch && categoryMatch && priceMatch;
  });
}
