'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '../../../../api/productService';
import StatusBadge from '../../../../components/StatusBadge';
import { Product, ProductStatus } from '../../../../types/product';
import {
  ProductCustomization,
  ProductCustomizationTypesNames,
} from '../../../../types/product-customization';

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [customizationsByType, setCustomizationsByType] = useState<
    { [key: string]: ProductCustomization[] } | {}
  >({});
  const [selectedCustomizations, setSelectedCustomizations] = useState(
    {} as any
  );

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    productService.getOne(productId as string).then((response) => {
      setProduct(response);
      setCustomizationsByType(response?.groupedCustomizations ?? {});
    });
  };

  const handleSelectCustomization = (
    type: string,
    customization: ProductCustomization
  ) => {
    if (selectedCustomizations[type]?.customizationId === customization.id) {
      setSelectedCustomizations({
        ...selectedCustomizations,
        [type]: { customizationId: null, price: 0 },
      });
    } else {
      setSelectedCustomizations({
        ...selectedCustomizations,
        [type]: {
          customizationId: customization.id,
          price: customization.price,
        },
      });
    }
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;

    let totalPrice = product.price ?? 0;

    if (product.isCustomizable) {
      Object.values(selectedCustomizations).forEach((customization: any) => {
        totalPrice += customization.price;
      });
    }

    return totalPrice.toFixed(2);
  };

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid min-h-screen m-8 p-8 pb-20 gap-16 sm:p-20'>
        <main className='flex flex-col w-full'>
          <button
            onClick={() => router.back()}
            className='flex items-center text-blue-500 hover:text-blue-700 mb-6'
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
            <div className='grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-md'>
              <div className='bg-white p-4'>
                <div className='relative h-80 w-full'>
                  <Image
                    src='/bicycle.svg'
                    alt={product.name}
                    fill
                    className='object-contain rounded-md'
                  />
                </div>

                <div className='bg-white p-6'>
                  <p className='text-gray-700 mb-6'>{product.description}</p>

                  <div className='border-t border-gray-200 pt-4 mb-6'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-semibold text-gray-800'>
                        Total price:
                      </span>
                      <span className='text-xl font-bold text-blue-600'>
                        {calculateTotalPrice()}€
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={
                      product.status !== ProductStatus.Active ||
                      product.stock === 0
                    }
                    className={`w-full py-3 px-4 rounded-md font-medium cursor-pointer ${
                      product.status === ProductStatus.Active &&
                      product.stock > 0
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.status === ProductStatus.Active &&
                    product.stock > 0
                      ? 'Add to card'
                      : 'Not available'}
                  </button>
                </div>
              </div>

              <div className='bg-white p-6'>
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
                  {product.stock > 0
                    ? `${product.stock} available units`
                    : 'Sin stock'}
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
                                <button
                                  key={customization.id}
                                  onClick={() =>
                                    handleSelectCustomization(
                                      type,
                                      customization
                                    )
                                  }
                                  className={`px-3 py-2 text-sm rounded-md border cursor-pointer ${
                                    selectedCustomizations[type]
                                      ?.customizationId === customization.id
                                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {customization.name}

                                  {customization.price &&
                                    customization.price > 0 &&
                                    ` (+${customization.price.toFixed(2)}€)`}
                                </button>
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
