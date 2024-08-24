import {
  getAllProducts,
  getProductByTargetGroup,
  decreaseProductQuantity,
} from "@/app/_lib/mongodb/productActions";

// export const metadata = {
//   title: "Shop now",
// };

const Page = async () => {
  const { data: products } = await getAllProducts();
  const { data: mensProducts } = await getProductByTargetGroup("men");
  const { data: womensProducts } = await getProductByTargetGroup("women");
  await decreaseProductQuantity("66ca26fd5ab076a5e9c63945", 39, 10);

  return (
    <div>
      <h1>all prods</h1>
      {products.map((product) => (
        <p key={product.product_model}>{product.product_model}</p>
      ))}
      <h2>mens prods</h2>
      {mensProducts.map((product) => (
        <p key={product.product_model}>{product.product_model}</p>
      ))}
      <h2>womens prods</h2>
      {womensProducts.map((product) => (
        <p key={product.product_model}>{product.product_model}</p>
      ))}
    </div>
  );
};

export default Page;
