import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, we couldn&apos;t find the product you&apos;re looking for.
      </p>
      <Link href="/shop">
        <Button>Back to Shop</Button>
      </Link>
    </div>
  );
}
