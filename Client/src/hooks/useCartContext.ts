import { useContext } from "react";
import { CartContext } from "../context/CartContextDefinition";

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
};
