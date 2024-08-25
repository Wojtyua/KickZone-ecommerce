import { getProductById } from "@/app/_lib/mongodb/productActions";

export async function generateMetadata({
  params,
}: {
  params: { product_id: string };
}) {
  const { data } = await getProductById(params.product_id);
  return { title: `${data.product_model}` };
}

const Page = async ({ params }: { params: { product_id: string } }) => {
  const { data, message } = await getProductById(params.product_id);
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
