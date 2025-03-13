import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Product } from '../../types/product';

interface GridProps {
  products: Product[];
}
interface CardProps {
  product: Product;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1'>
      <div className='relative h-48 w-full'>
        <Image
          src={'/bicycle.svg'}
          alt={product.name}
          fill
          className='object-fit'
        />
      </div>

      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>
          {product.name}
        </h3>

        <p
          className={`text-gray-600 text-sm mb-3 line-clamp-2 ${
            !product.description && 'text-white'
          }`}
        >
          {product.description || '-'}
        </p>

        <div className='flex justify-end items-center'>
          <span className='text-blue-600 font-bold'>
            {product.price ? product.price.toFixed(2) + '€' : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC<GridProps> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products?.length > 0 ? (
        products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))
      ) : (
        <span>No products found</span>
      )}
    </div>
  );
};

export default ProductGrid;
