'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '../../../../api/productService';
import AdminProductCustomizationTable from '../../../../components/admin/ProductCustomizationTableComponent';
import {
  ProductCustomization,
  ProductCustomizationStatus,
} from '../../../../types/productCustomization';

export default function AdminProductsPage() {
  const router = useRouter();
  const [customizations, setCustomizations] = useState<ProductCustomization[]>(
    []
  );

  useEffect(() => {
    getCustomizations();
  }, []);

  const getCustomizations = () => {
    productService.getAllCustomizations().then((response) => {
      setCustomizations(response ?? []);
    });
  };

  const handleMarkOutOfStock = (customization: ProductCustomization) => {
    productService
      .updateCustomization({
        ...customization,
        status: ProductCustomizationStatus.TemporarilyOutOfStock,
      })
      .finally(() => getCustomizations());
  };

  return (
    <div className='font-[family-name:var(--font-geist-sans)]'>
      <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16'>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <AdminProductCustomizationTable
            customizations={customizations}
            onMarkOutOfStock={handleMarkOutOfStock}
          />
        </main>
      </div>
    </div>
  );
}
