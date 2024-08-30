import ProductsList from "@/app/_components/ProductsList";
import FilterHandler from "@/app/(routes)/shop/(target_group)/_components/FilterHandler";
import { getProductByTargetGroup } from "@/app/_actions/productActions";
import { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: products } = await getProductByTargetGroup("men");

  const filterOptions = {
    brands: Array.from(new Set(products.map((p) => p.brand))),
    categories: Array.from(new Set(products.flatMap((p) => p.categories))),
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold uppercase mb-4">Mens shoes</h2>
      <div className="grid grid-cols-[18rem_1fr]">
        <FilterHandler
          initialFilters={searchParams}
          filterOptions={filterOptions}
        />
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<div>Loading products...</div>}
        >
          <ProductsList searchParams={searchParams} products={products} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
