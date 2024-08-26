import FeaturedProductsList from "@/app/_components/FeaturedProductsList";
import { Suspense } from "react";

export const revalidate = 3600;

export const metadata = {
  title: "Shop now",
};

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl">Featured Products</h1>
      <p>our most popular sneakers 🤓 very cool 👍</p>

      <Suspense fallback={<div>Loading featured prods only...</div>}>
        <FeaturedProductsList />
      </Suspense>
    </div>
  );
};

export default Page;
