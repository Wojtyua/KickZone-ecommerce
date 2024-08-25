import Link from "next/link";

const ProductByIdError = ({ message }: { message: string }) => {
  return (
    <div>
      Oj ale errorek [{message}]<Link href="/shop">Wróć do sklepu</Link>
    </div>
  );
};

export default ProductByIdError;
