import FilteredProducts from "@/app/_components/shop/FilteredProducts";

export const metadata = {
  title: "Shop by Category | Our Shop",
  description: "Browse our collection by category",
};

export default function GroupPage({
  params,
}: {
  params: { group: "mens" | "womens" };
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        {params.group} Products
      </h2>
      <FilteredProducts group={params.group === "mens" ? "men" : "women"} />
    </div>
  );
}
