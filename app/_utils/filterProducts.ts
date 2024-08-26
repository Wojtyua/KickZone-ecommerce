import { ProductType } from "@/app/_lib/mongodb/db.types";

export function filterProducts(
  products: ProductType[],
  searchParamsWrapper: {
    searchParams: { [key: string]: string | string[] | undefined };
  }
): ProductType[] {
  const searchParams = searchParamsWrapper.searchParams;
  console.log("Received searchParams:", searchParams);

  return products.filter((product) => {
    console.log("Filtering product:", product);

    const brands = Array.isArray(searchParams.brand)
      ? searchParams.brand
      : typeof searchParams.brand === "string"
      ? searchParams.brand.split(",")
      : undefined;

    const categories = Array.isArray(searchParams.category)
      ? searchParams.category
      : typeof searchParams.category === "string"
      ? searchParams.category.split(",")
      : undefined;

    const minPrice = searchParams.minPrice?.toString();
    const maxPrice = searchParams.maxPrice?.toString();

    console.log("Parsed filters:", {
      brands,
      categories,
      minPrice,
      maxPrice,
    });

    if (brands?.length) {
      const brandMatch = brands.some((brand) => {
        const normalizedBrand = brand.toLowerCase();
        const productBrand = product.brand.toLowerCase();
        const match = productBrand === normalizedBrand;
        console.log(
          `Checking brand "${normalizedBrand}" against product brand "${productBrand}"`,
          "Match:",
          match
        );
        return match;
      });

      if (!brandMatch) {
        console.log("Filtered out by brand");
        return false;
      }
    }

    if (categories?.length) {
      const categoryMatch = categories.some((cat) => {
        const productCategories = product.categories.map((c) =>
          c.toLowerCase()
        );
        const filterCategory = cat.toLowerCase();
        const match = productCategories.includes(filterCategory);
        console.log(
          `Checking category "${filterCategory}" against product categories ${productCategories}`,
          "Match:",
          match
        );
        return match;
      });

      if (!categoryMatch) {
        console.log("Filtered out by category");
        return false;
      }
    }

    if (minPrice && product.price < parseFloat(minPrice)) {
      console.log("Filtered out by minPrice");
      return false;
    }

    if (maxPrice && product.price > parseFloat(maxPrice)) {
      console.log("Filtered out by maxPrice");
      return false;
    }

    console.log("Product passed all filters");
    return true;
  });
}
