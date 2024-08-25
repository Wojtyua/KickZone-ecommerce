import {
  getAllProducts,
  getProductByTargetGroup,
} from "@/app/_lib/mongodb/productActions";
import Image from "next/image";

// export const metadata = {
//   title: "Shop now",
// };

const Page = async () => {
  const { data: products } = await getAllProducts();

  return (
    <div>
      <h1>all prods</h1>
      {products.map((product) => (
        <div key={product.product_model}>
          <Image
            src={product.images[0]}
            width={200}
            height={200}
            alt={product.product_model}
          />
          <p>{product.product_model}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
