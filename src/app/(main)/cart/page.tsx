'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '../../../api/productService';
import StatusBadge from '../../../components/StatusBadge';
import { useCart } from '../../../context/CartContext';
import { CartItem } from '../../../types/cart';
import { Product } from '../../../types/product';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  const [subtotal, setSubtotal] = useState<number>(0);
  const [shippingCost] = useState<number>(9.99);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    calculateTotals();
    getProducts();
  }, [cartItems]);

  const getProducts = () => {
    productService.getAll().then((response) => {
      setProducts(response ?? []);
    });
  };

  const calculateTotals = () => {
    const itemsSubtotal = cartItems.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0
    );

    setSubtotal(itemsSubtotal);
    setTotal(itemsSubtotal + shippingCost);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    const cartItemId = id.split('#')[0];

    const cartItemStock = cartItems.reduce((total: number, item: CartItem) => {
      return item.id.split('#')[0] === cartItemId
        ? total + item.quantity
        : total;
    }, 0);
    const productStock = products.find(
      (item: any) => item.id === cartItemId
    )?.stock;

    const isNewQuantityLess =
      cartItems.find((item: CartItem) => item.id === id)?.quantity! >
      newQuantity;
    const isStillStock =
      cartItemStock > 0 && cartItemStock < (productStock ?? 2);

    //TODO: Also check every customization stock

    if (isNewQuantityLess || isStillStock) {
      const cartItem: CartItem = cartItems.find((item: any) => item.id === id)!;
      if (cartItem) updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleGoToProductPage = (id: string) => {
    router.push(`/products/${id.split('#')[0]}`);
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid min-h-screen m-8 p-8 pb-20 gap-16 sm:p-20'>
        <main className='flex flex-col w-full'>
          <button
            onClick={() => router.back()}
            className='absolute top-31 left-31 z-20'
          >
            <Image
              src={'/arrow-left.svg'}
              alt={'return'}
              width={40}
              height={40}
              className='cursor-pointer'
            />
          </button>

          {cartItems.length === 0 ? (
            <div className='bg-white rounded-md shadow-md p-8 text-center'>
              <p className='text-xl text-gray-700 mb-6'>Your cart is empty</p>

              <button
                onClick={handleContinueShopping}
                className='py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium'
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2'>
                <div className='bg-white rounded-md shadow-md p-6'>
                  <div className='flex justify-between items-center border-b border-gray-200 mt-12 pb-4 mb-6'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      Cart Items ({cartItems.length})
                    </h2>

                    <button
                      onClick={() => clearCart()}
                      className='text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer'
                    >
                      Clear Cart
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className='flex flex-col md:flex-row border-b border-gray-200 py-6 last:border-b-0 last:pb-0'
                    >
                      <div className='flex-shrink-0 w-full md:w-32 h-32 relative mb-4 md:mb-0'>
                        <Image
                          src='/bicycle.svg'
                          alt={item.name}
                          fill
                          className='object-contain rounded-md cursor-pointer'
                          onClick={() => handleGoToProductPage(item.id)}
                        />
                      </div>

                      <div className='flex-grow md:ml-6'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                              {item.name}
                            </h3>

                            <StatusBadge status={item.status} />

                            {item.category && (
                              <p className='text-sm text-gray-500 mt-2'>
                                Category: {item.category}
                              </p>
                            )}
                          </div>

                          <div className='text-lg font-bold text-blue-600'>
                            {item.totalPrice.toFixed(2)}€
                          </div>
                        </div>

                        {item.description && (
                          <p className='text-gray-700 my-2 line-clamp-2'>
                            {item.description}
                          </p>
                        )}

                        {item.customizations &&
                          item.customizations.length > 0 && (
                            <div className='mt-2 mb-4'>
                              <p className='text-sm font-medium text-gray-700'>
                                Customizations:
                              </p>

                              <div className='flex flex-wrap gap-2 mt-1'>
                                {item.customizations.map((customId) => (
                                  <span
                                    key={customId as string}
                                    className='px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md'
                                  >
                                    {customId as string}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className='flex justify-between items-center mt-4'>
                          <div className='flex items-center'>
                            <input
                              type='number'
                              min='1'
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  Number(e.target.value)
                                )
                              }
                              className='w-16 h-8 border-t border border-gray-300 text-center border-gray-300 rounded-md hover:bg-gray-100'
                            />
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className='text-red-500 hover:text-red-700 cursor-pointer'
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='lg:col-span-1'>
                <div className='bg-white rounded-md shadow-md p-6 sticky top-20'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-6'>
                    Order Summary
                  </h2>

                  <div className='space-y-4 mb-6'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Subtotal</span>

                      <span className='font-medium'>
                        {subtotal.toFixed(2)}€
                      </span>
                    </div>

                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Shipping</span>

                      <span className='font-medium'>
                        {shippingCost.toFixed(2)}€
                      </span>
                    </div>

                    <div className='border-t border-gray-200 pt-4 mt-4'>
                      <div className='flex justify-between'>
                        <span className='text-lg font-semibold text-gray-800'>
                          Total
                        </span>

                        <span className='text-xl font-bold text-blue-600'>
                          {total.toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className='w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium mb-4 cursor-pointer'>
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={handleContinueShopping}
                    className='w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium cursor-pointer'
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
