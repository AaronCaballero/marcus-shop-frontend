'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '../../api/productService';
import { CreateProduct, newProduct } from '../../types/product';
import {
  CreateProductCustomization,
  ProductCustomization,
} from '../../types/product-customization';
import ProductBasicInfoComponent from './ProductBasicInfoComponent';
import ProductCustomizationsComponent from './ProductCustomizationsComponent';

interface Props {
  productId?: string;
  editable?: boolean;
}

const ProductForm: React.FC<Props> = ({ productId, editable = false }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState<boolean>(editable);
  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);
  const [groupedCustomizations, setGroupedCustomizations] = useState<
    { [key: string]: ProductCustomization[] } | {}
  >({});

  const [product, setProduct] = useState<CreateProduct | any>(newProduct());

  useEffect(() => {
    getGroupedCustomizations();

    if (productId) getProduct(productId);
  }, [productId]);

  const getProduct = (productId: string) => {
    productService.getOne(productId).then((response) => {
      console.log(response);
      if (response) setProduct({ ...response });
    });
  };

  const getGroupedCustomizations = () => {
    productService.getGroupedCustomizations().then((response) => {
      console.log(response);
      if (response) setGroupedCustomizations({ ...response });
    });
  };

  const handleProductChange = (updatedProduct: Partial<CreateProduct>) => {
    setProduct({
      ...product,
      ...updatedProduct,
    });
  };

  const addCustomization = async (customization: ProductCustomization) => {
    const newCustomization: ProductCustomization | null = customization?.id
      ? customization
      : await productService.createCustomization(
          customization as CreateProductCustomization
        );

    if (newCustomization && !product.customizations?.includes(newCustomization))
      setProduct({
        ...product,
        customizations: [...(product.customizations || []), newCustomization],
      });
  };

  const removeCustomization = (id: string) => {
    setProduct({
      ...product,
      customizations:
        product.customizations?.filter(
          (customization: any) => customization.id !== id
        ) || [],
    });
  };

  const validateForm = (): boolean => {
    if (
      product.name &&
      product.price >= 0 &&
      product.stock >= 0 &&
      product.category
    )
      return true;

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClickedSubmit(true);

    if (!validateForm()) return;

    try {
      if (editMode && productId) {
        // await productService.update(productId, product);
      } else {
        await productService.create(product);
      }

      // Redirect to products list
      router.push('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
    }
  };

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid min-h-screen m-8 p-8 pb-20 sm:p-20'>
        <main className='flex flex-col w-full bg-white rounded-md shadow-md p-6'>
          <div className='flex items-center mb-6'>
            <button onClick={() => router.back()} className='mr-4'>
              <Image
                src={'/arrow-left.svg'}
                alt={'return'}
                width={40}
                height={40}
                className='cursor-pointer'
              />
            </button>

            <h1 className='text-2xl font-bold text-gray-800'>
              {editMode
                ? 'Edit Product'
                : productId
                ? 'Product information'
                : 'Create New Product'}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <ProductBasicInfoComponent
                product={product}
                onChange={handleProductChange}
                clickedSubmit={clickedSubmit}
              />

              <ProductCustomizationsComponent
                isCustomizable={product.isCustomizable}
                customizations={product.customizations || []}
                groupedCustomizations={groupedCustomizations}
                onAddCustomization={addCustomization}
                onRemoveCustomization={removeCustomization}
                showAdd={editMode || !productId}
              />
            </div>

            {/* Form Actions */}
            <div className='mt-8 pt-5 border-t border-gray-200 flex justify-end'>
              <button
                type='button'
                onClick={() => router.back()}
                className='mr-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer'
              >
                Cancel
              </button>

              {(editMode || !productId) && (
                <button
                  type='submit'
                  className='py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300 cursor-pointer'
                  disabled={productId ? true : false}
                >
                  {editMode ? 'Update Product' : 'Create Product'}
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ProductForm;
