import React from "react";
import { useCart } from "../hooks/useCart";
import { CartContext } from "./CartContextDefinition";

// Proveedor del Contexto del Carrito
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cartFunctions = useCart();
  return (
    <CartContext.Provider value={cartFunctions}>
      {children}
    </CartContext.Provider>
  );
};
