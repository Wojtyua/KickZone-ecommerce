import ProductByIdError from "@/app/_components/ProductByIdError";
import {
  getAllProducts,
  getProductById,
} from "@/app/_lib/mongodb/productActions";

export async function generateMetadata({
  params,
}: {
  params: { product_id: string };
}) {
  const { data } = await getProductById(params.product_id);
  return { title: `${data.product_model}` };
}

export async function generateStaticParams() {
  const { data, success, message } = await getAllProducts();
  const ids = data.map((product) => ({ product_id: String(product._id) }));

  console.log(ids);
  return ids;
}

const Page = async ({ params }: { params: { product_id: string } }) => {
  const { data, message, success } = await getProductById(params.product_id);

  if (!success) return <ProductByIdError message={message} />;
  return (
    <div>
      <span>{message}</span>
      <p>{String(data._id)}</p>
      <h1>{data.product_model}</h1>
      <p>{data.description}</p>
      <p>{data.price}</p>
    </div>
  );
};

export default Page;
