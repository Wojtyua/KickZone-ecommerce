import ProductDetail from "@/app/_components/ProductDetail";
import { ProductType } from "@/app/_lib/mongodb/db.types";
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
  const { data } = await getAllProducts();
  const ids = data.map((product) => ({ product_id: String(product._id) }));

  return ids;
}

const Page = async ({ params }: { params: { product_id: string } }) => {
  const { data, message, success } = await getProductById(params.product_id);
  // const {
  //   _id,
  //   product_model,
  //   price,
  //   variants,
  //   description,
  //   images,
  //   target_group,
  //   categories,
  // } = data;
  const data2 = JSON.parse(JSON.stringify(data));

  if (!success) return <div>Error: {message}</div>;

  return (
    <div>
      <ProductDetail data={data2} />
    </div>
  );
};

export default Page;
