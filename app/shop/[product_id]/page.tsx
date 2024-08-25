import { getProductById } from "@/app/_lib/mongodb/productActions";

const Page = async ({ params }: { params: { product_id: string } }) => {
  const productId = params.product_id;
  const { data, message } = await getProductById(productId);
  return (
    <div>
      <span>{message}</span>
      <h1>{data.product_model}</h1>
      <p>{data.description}</p>
      <p>{data.price}</p>
    </div>
  );
};

export default Page;
