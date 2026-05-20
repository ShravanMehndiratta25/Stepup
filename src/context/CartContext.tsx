"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
}

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("stepup_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("stepup_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Optional: Open drawer or redirect? User said "added to my cart page"
    // We'll keep the drawer functionality for now but add the page.
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
