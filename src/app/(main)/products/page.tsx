'use client';

import { useEffect, useState } from 'react';
import { productService } from '../../../api/productService';
import { Product } from '../../../types/product';
import ProductGrid from './ProductCardGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    productService.getAll().then((response) => {
      setProducts(response ?? []);
    });
  };

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16'>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}
