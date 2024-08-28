import ProductDetail from "@/app/_components/ProductDetail";
import { ProductType } from "@/app/_lib/mongodb/db.types";
import { getAllProducts, getProductById } from "@/app/_actions/productActions";

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
  const formattedData = JSON.parse(JSON.stringify(data));

  if (!success) return <div>Error: {message}</div>;

  return (
    <div>
      <ProductDetail data={formattedData} />
    </div>
  );
};

export default Page;
