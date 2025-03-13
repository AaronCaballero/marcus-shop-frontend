'use client';

import { useParams } from 'next/navigation';
import ProductForm from '../../../../../../components/admin/Product.form';

export default function EditProductPage() {
  const { productId } = useParams();

  return <ProductForm productId={productId as string} editable />;
}
