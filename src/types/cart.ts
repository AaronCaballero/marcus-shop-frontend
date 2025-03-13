import { Product } from './product';

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => boolean;
  updateQuantity: (id: string, quantity: number) => boolean;
  removeFromCart: (id: string) => boolean;
  clearCart: () => boolean;
}

export interface CartItem extends Product {
  totalPrice: number;
  quantity: number;
}
