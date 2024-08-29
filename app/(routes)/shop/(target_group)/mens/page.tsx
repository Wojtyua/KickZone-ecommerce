import ProductsList from "@/app/_components/ProductsList";
import { Suspense } from "react";

const Page = async (searchParamsWrapper: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { searchParams } = searchParamsWrapper; // Wyodrębnienie searchParams

  return (
    <div>
      <h2 className="text-3xl font-semibold uppercase mb-4">Mens shoes</h2>
      <Suspense fallback={<div>Loading mens products...</div>}>
        <ProductsList target="men" searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Page;
