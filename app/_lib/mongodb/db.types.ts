export type ProductType = {
  _id: string;
  product_model: string;
  brand: string;
  price: number;
  description: string;
  featured: boolean;
  target_group: "men" | "women";
  categories: string[];
  images: string[];
  variants: {
    size: number;
    quantity: number;
  }[];
};
export type UserType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  image: string;
};
