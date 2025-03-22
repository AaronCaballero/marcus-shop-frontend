'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '../../../../api/productService';
import StatusBadge from '../../../../components/StatusBadge';
import { useCart } from '../../../../context/CartContext';
import { CartItem } from '../../../../types/cart';
import { Product, ProductStatus } from '../../../../types/product';
import {
  ProductCustomization,
  ProductCustomizationStatus,
  ProductCustomizationTypesNames,
} from '../../../../types/productCustomization';
import { ProhibitedCustomization } from '../../../../types/prohibitedCustomization';

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = useParams();
  const { cartItems, addToCart } = useCart();
  const [stock, setStock] = useState<number>(0);

  const [product, setProduct] = useState<Product | null>(null);
  const [prohibitedCustomizations, setProhibitedCustomizations] = useState<
    ProhibitedCustomization[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [customizationsByType, setCustomizationsByType] = useState<
    { [key: string]: ProductCustomization[] } | object
  >({});
  const [selectedCustomizations, setSelectedCustomizations] = useState(
    {} as any
  );
  const [blockedCustomizations, setBlockedCustomizations] = useState<string[]>(
    []
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipKey, setTooltipKey] = useState('');

  useEffect(() => {
    getProduct();
    getProhibitedCustomizations();
  }, []);

  useEffect(() => {
    calculateStock();
  }, [product]);

  useEffect(() => {
    handleProhibitedCustomizations();
    calculateTotalPrice();
  }, [selectedCustomizations]);

  const getProduct = () => {
    productService.getOne(productId as string).then((response) => {
      setProduct(response);
      setTotalPrice(response?.price ?? 0);
      setCustomizationsByType(response?.groupedCustomizations ?? {});
    });
  };

  const getProhibitedCustomizations = () => {
    productService
      .getProhibitedCustomizationsByProduct(productId as string)
      .then((response) => {
        setProhibitedCustomizations(response ?? []);
      });
  };

  const calculateStock = () => {
    const cartItemStock = cartItems.reduce((total: number, item: CartItem) => {
      return item.id.split('#')[0] === productId
        ? total + item.quantity
        : total;
    }, 0);

    setStock((product?.stock ?? 0) - cartItemStock || 0);
  };

  const handleAddToCart = (item: Product) => {
    const itemToAdd: CartItem = {
      ...item,
      id: productId + '#' + stock,
      customizations:
        (Object.values(selectedCustomizations).map((customization: any) => {
          return {
            id: customization.id,
            name: customization.name,
            price: customization.price,
            stock: customization.stock,
          };
        }) as ProductCustomization[]) ?? [],
      totalPrice: totalPrice,
      quantity: 1,
    };

    if (addToCart(itemToAdd)) router.push('/cart');
  };

  //TODO: Reduce customizations stock with the cart items

  const handleSelectCustomization = (
    type: string,
    customization: ProductCustomization
  ) => {
    if (selectedCustomizations[type]?.id === customization.id) {
      setSelectedCustomizations({
        ...selectedCustomizations,
        [type]: { id: null, name: '', price: 0, stock: 0 },
      });
    } else {
      setSelectedCustomizations({
        ...selectedCustomizations,
        [type]: {
          id: customization.id,
          name: customization.name,
          price: customization.price,
          stock: customization.stock,
        },
      });
    }
  };

  const getProhibitedCombinations = (customizationId: string): string[] => {
    return prohibitedCustomizations
      .filter((item) => item.customizationIds?.includes(customizationId))
      .flatMap(
        (item) =>
          item.customizationIds?.filter((id) => id !== customizationId) || []
      );
  };

  const handleProhibitedCustomizations = () => {
    const blockCustomizations = Object.values(selectedCustomizations).flatMap(
      (customization: any) => {
        const res = getProhibitedCombinations(customization.id);
        return customization.id ? res : [];
      }
    );

    setBlockedCustomizations(blockCustomizations);
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;

    let price = product.price ?? 0;

    if (product.isCustomizable) {
      Object.values(selectedCustomizations).forEach((customization: any) => {
        price += customization.price;
      });
    }

    setTotalPrice(price);
  };

  const stockTooltip = (customization: ProductCustomization) => {
    return (
      <>
        {showTooltip &&
          tooltipKey === customization.id &&
          (customization.stock < 1 ||
            customization.status ===
              ProductCustomizationStatus.TemporarilyOutOfStock) && (
            <div className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded w-44 text-center text-sm'>
              Temporarily out of stock
              <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500'></div>
            </div>
          )}
      </>
    );
  };

  const prohibitedToolpit = (customization: ProductCustomization) => {
    return (
      <>
        {showTooltip &&
          tooltipKey === customization.id &&
          customization.stock > 0 &&
          blockedCustomizations.includes(customization.id) && (
            <div className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded w-66 text-center text-sm'>
              Prohibited customization combination
              <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500'></div>
            </div>
          )}
      </>
    );
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

          {product && (
            <div className='grid grid-cols-1 md:grid-cols-2 bg-white rounded-md shadow-md'>
              <div className='p-4'>
                <div className='relative h-80 w-full'>
                  <Image
                    src='/bicycle.svg'
                    alt={product.name}
                    fill
                    className='object-contain rounded-md'
                  />
                </div>

                <div className='p-6'>
                  <p className='text-gray-700 mb-6'>{product.description}</p>

                  <div className='border-t border-gray-200 pt-4 mb-6'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-semibold text-gray-800'>
                        Total price:
                      </span>
                      <span className='text-xl font-bold text-blue-600'>
                        {totalPrice.toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 px-4 rounded-md font-medium ${
                      product.status === ProductStatus.Active && stock > 0
                        ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                    disabled={
                      product.status !== ProductStatus.Active || stock === 0
                    }
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    {product.status === ProductStatus.Active && stock > 0
                      ? 'Add to card'
                      : 'Not available'}
                  </button>
                </div>
              </div>

              <div className='p-6'>
                <div className='flex justify-between items-start'>
                  <h1 className='text-2xl font-bold text-gray-800 mb-2'>
                    {product.name}
                  </h1>

                  <StatusBadge status={product.status} />
                </div>

                <div className='text-xl font-bold text-blue-600 my-3'>
                  {product.price ? product.price.toFixed(2) + '€' : '-'}
                </div>

                <div className='text-sm text-gray-500 mb-1'>
                  Category: {product.category}
                </div>

                <div className='text-sm text-gray-500 mb-4'>
                  {stock > 0
                    ? `Stock: ${
                        stock >= 0 ? stock : product.stock
                      } available units`
                    : 'Without stock'}
                </div>

                <div className='border-t border-gray-200 my-4'></div>

                {product.isCustomizable && product.groupedCustomizations && (
                  <div className='space-y-4 mb-6'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      Customization
                    </h2>

                    {Object.entries(customizationsByType)?.map(
                      ([type, customizations]) => (
                        <div key={type}>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            {
                              ProductCustomizationTypesNames[
                                type as keyof typeof ProductCustomizationTypesNames
                              ]
                            }
                          </label>

                          <div className='flex flex-wrap gap-2'>
                            {customizations.map(
                              (customization: ProductCustomization) => (
                                <div
                                  key={customization.id}
                                  className='relative'
                                >
                                  {stockTooltip(customization)}
                                  {prohibitedToolpit(customization)}

                                  <button
                                    key={'button-' + customization.id}
                                    onClick={() =>
                                      customization.stock > 0 &&
                                      !blockedCustomizations.includes(
                                        customization.id
                                      ) &&
                                      handleSelectCustomization(
                                        type,
                                        customization
                                      )
                                    }
                                    className={`px-3 py-2 text-sm rounded-md border ${
                                      selectedCustomizations[type]?.id ===
                                      customization.id
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    } ${
                                      customization.stock < 1 ||
                                      customization.status ===
                                        ProductCustomizationStatus.TemporarilyOutOfStock ||
                                      blockedCustomizations.includes(
                                        customization.id
                                      )
                                        ? 'opacity-50'
                                        : 'cursor-pointer'
                                    }`}
                                    onMouseEnter={() => {
                                      setTooltipKey(customization.id);
                                      setShowTooltip(true);
                                    }}
                                    onMouseLeave={() => setShowTooltip(false)}
                                  >
                                    {customization.name}

                                    {customization.price &&
                                    customization.price > 0
                                      ? ` (+${customization.price.toFixed(2)}€)`
                                      : ''}
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
