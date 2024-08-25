import { getFeaturedProducts } from "@/app/_lib/mongodb/productActions";
import Image from "next/image";

const FeaturedProductsList = async () => {
  const { data: products, message, success } = await getFeaturedProducts();
  return (
    <div>
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

export default FeaturedProductsList;
