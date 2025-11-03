export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  stock: number;
  rating: number;
  isNew: boolean;
  isDiscounted: boolean;
  oldPrice?: number;
};
