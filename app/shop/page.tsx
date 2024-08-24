"use client";

import { createProduct } from "@/app/_lib/mongodb/productActions";
// export const metadata = {
//   title: "Shop now",
// };

const handleClick = async () => {
  const productData = {
    product_model: "test product",
    brand: "test brand",
    price: 100,
    description: "test description",
    featured: false,
    target_group: "men",
    categories: ["running", "sport"],
    images: ["test image", "test image"],
    variants: [
      { size: 39, quantity: 5 },
      { size: 40, quantity: 10 },
    ],
  };

  const response = await createProduct(productData);
  console.log(response);
};

const Page = () => {
  return (
    <div>
      Shop page
      <button className="p-3 bg-primary" onClick={handleClick}>
        Create product
      </button>
    </div>
  );
};

export default Page;
