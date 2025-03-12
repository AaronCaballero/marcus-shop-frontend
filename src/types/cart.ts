import { Product } from './product';

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export interface CartItem extends Product {
  totalPrice: number;
  quantity: number;
}
