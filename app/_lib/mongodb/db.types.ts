export type ProductType = {
  _id?: string;
  product_model: string;
  brand: string;
  price: number;
  description?: string;
  featured: boolean;
  target_group: string;
  categories: string[]; // Tablica stringów dla kategorii
  images: string[]; // Tablica stringów dla URL obrazów
  variants: {
    size: number;
    quantity: number;
  }[]; // Tablica obiektów dla wariantów
};
