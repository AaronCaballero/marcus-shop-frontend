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

  const addToCart = (item: CartItem): boolean => {
    const isPossibleToAdd = canAddNewItemToCart(cartItems, item, 1);

    if (!isPossibleToAdd) return false;

    setCartItems((previousCart) => {
      return [...previousCart, item];
    });
    return true;
  };

  const updateQuantity = (id: string, quantity: number): boolean => {
    const item = cartItems.find((cartItem) => cartItem.id === id) as CartItem;
    if (!item) return false;

    const isPossibleToAdd = canAddNewItemToCart(
      cartItems,
      item,
      quantity - item.quantity
    );

    if (!isPossibleToAdd) return false;

    setCartItems((previousCart) => {
      return previousCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: quantity } : cartItem
      );
    });
    return true;
  };

  const removeFromCart = (id: string): boolean => {
    setCartItems((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
    return true;
  };

  const clearCart = (): boolean => {
    setCartItems([]);
    return true;
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

const calculateCartItemsStock = (
  cartItems: CartItem[]
): Record<string, number>[] => {
  const itemStockUsage: Record<string, number> = {};
  const customizationStockUsage: Record<string, number> = {};

  cartItems.forEach((item) => {
    const itemId = item.id.split('#')[0];

    if (!itemStockUsage[itemId]) {
      itemStockUsage[itemId] = 0;
    }
    itemStockUsage[itemId] += item.quantity;

    if (item.customizations && item.customizations.length > 0) {
      item.customizations.forEach((customization) => {
        if (!customizationStockUsage[customization.id]) {
          customizationStockUsage[customization.id] = 0;
        }
        customizationStockUsage[customization.id] += item.quantity;
      });
    }
  });

  return [itemStockUsage, customizationStockUsage];
};

const isEnoughItemStock = (
  itemStockUsage: Record<string, number>,
  itemToAdd: CartItem,
  quantityToAdd: number
): boolean => {
  const currentStockUsage = itemStockUsage[itemToAdd.id.split('#')[0]] || 0;
  const futureStockUsage = currentStockUsage + quantityToAdd;

  if (itemToAdd.stock >= futureStockUsage) {
    return true;
  } else {
    alert(`Not enough stock to add the item "${itemToAdd.name}" to the cart!`);
    return false;
  }
};

const isEnoughCustomizationsStock = (
  customizationStockUsage: Record<string, number>,
  itemToAdd: CartItem,
  quantityToAdd: number
): boolean => {
  if (!itemToAdd.customizations || itemToAdd.customizations?.length === 0)
    return true;

  for (const customization of itemToAdd.customizations) {
    const currentUsage = customizationStockUsage[customization.id] || 0;
    const futureUsage = currentUsage + quantityToAdd;

    if (futureUsage > customization.stock) {
      alert(
        `Not enough stock to add the item "${itemToAdd.name}" to the cart due 
        to the customization "${customization.name}" not enough stock!`
      );
      return false;
    }
  }

  return true;
};

const canAddNewItemToCart = (
  cartItems: CartItem[],
  itemToAdd: CartItem,
  quantityToAdd: number = 1
): boolean => {
  const [itemStockUsage, customizationStockUsage] =
    calculateCartItemsStock(cartItems);

  const enoughItemStock = isEnoughItemStock(
    itemStockUsage,
    itemToAdd,
    quantityToAdd
  );
  if (!enoughItemStock) return false;

  const enoughCustomizationsStock = isEnoughCustomizationsStock(
    customizationStockUsage,
    itemToAdd,
    quantityToAdd
  );
  if (!enoughCustomizationsStock) return false;

  return true;
};
