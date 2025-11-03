import { useState, useEffect } from "react";
import type { Product } from "../components/products/typeProducts";

interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = "shopping_cart_data";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [cart]);

  const addItem = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      // No permitir agregar si no hay stock
      if (product.stock <= 0) {
        return prevCart;
      }

      if (existingItem) {
        const desired = existingItem.quantity + quantity;
        const clamped = Math.min(desired, product.stock);
        // Si ya está al máximo, no cambiar
        if (clamped === existingItem.quantity) {
          return prevCart;
        }
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: clamped } : item
        );
      } else {
        const initialQty = Math.min(quantity, product.stock);
        if (initialQty <= 0) {
          return prevCart;
        }
        return [...prevCart, { product, quantity: initialQty }];
      }
    });
  };

  const removeItem = (productId: number | string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === productId
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.product.id !== productId);
      }
    });
  };

  const removeProduct = (productId: number | string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Validación para checkout: todos los items deben tener stock suficiente
  const canCheckout = cart.every(
    (item) => item.product.stock > 0 && item.quantity <= item.product.stock
  );

  return {
    cart,
    addItem,
    removeItem,
    removeProduct,
    clearCart,
    totalItems,
    totalPrice,
    canCheckout,
  };
};
