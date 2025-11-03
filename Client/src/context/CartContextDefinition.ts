import { createContext } from "react";
import type { Product } from "../components/products/typeProducts";

// Definición de tipos para el contexto
export interface CartContextType {
  cart: { product: Product; quantity: number }[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number | string) => void;
  removeProduct: (productId: number | string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  canCheckout: boolean;
}

// Inicializa el contexto con un valor que cumple la interfaz
export const CartContext = createContext<CartContextType | undefined>(undefined);
