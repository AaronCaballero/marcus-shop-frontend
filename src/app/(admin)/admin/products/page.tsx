'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '../../../../api/productService';
import { Product } from '../../../../types/product';
import AdminProductTable from '../../../../components/admin/ProductTableComponent';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    productService.getAll().then((response) => {
      setProducts(response ?? []);
    });
  };

  const handleViewProduct = (product: Product) => {
    router.push(`/admin/products/${product.id}`);
  };

  const handleCreateProduct = () => {
    router.push('/admin/products/create');
  };

  const handleEditProduct = (product: Product) => {
    router.push(`/admin/products/${product.id}/update`);
  };

  const handleDeleteProduct = (id: string) => {
    productService.delete(id).finally(() => getProducts());
  };

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16'>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <AdminProductTable
            products={products}
            onView={handleViewProduct}
            onCreateNew={handleCreateProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </main>
      </div>
    </div>
  );
}
