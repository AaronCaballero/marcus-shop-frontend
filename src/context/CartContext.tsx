'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartContextType, CartItem } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'shopping_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((previousCart) => {
      return [...previousCart, item];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((previousCart) => {
      const existingItem = previousCart.find((cartItem) => cartItem.id === id);
      if (existingItem) {
        return previousCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: quantity } : cartItem
        );
      }
      return previousCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart should be used within a CartProvider');
  }
  return context;
}
