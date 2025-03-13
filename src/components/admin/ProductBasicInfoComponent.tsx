import React from 'react';
import {
  CreateProduct,
  ProductCategory,
  ProductStatus,
} from '../../types/product';

interface Props {
  product: CreateProduct;
  onChange: (updatedProduct: Partial<CreateProduct>) => void;
  clickedSubmit: boolean;
}

const ProductBasicInfoComponent: React.FC<Props> = ({
  product,
  onChange,
  clickedSubmit,
}) => {
  const handleInputChange = (e: any) => {
    const { type, name, value } = e.target;

    switch (type) {
      case 'checkbox':
        onChange({ [name]: e.target.checked });
        return;
      case 'number':
        onChange({
          [name]: value === '' ? 0 : Number(value),
        });
        return;
      default:
        onChange({ [name]: value });
        return;
    }
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-semibold text-gray-800 border-b pb-2'>
        Basic Information
      </h2>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Product Name*
        </label>

        <input
          type='text'
          name='name'
          value={product.name}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded-md ${
            clickedSubmit && !product.name
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
        />

        {clickedSubmit && !product.name && (
          <p className='text-red-500 text-xs mt-1'>Product name is required</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Description
        </label>

        <textarea
          name='description'
          value={product.description}
          onChange={handleInputChange}
          rows={4}
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Price (€)*
          </label>

          <input
            type='number'
            name='price'
            value={product.price || 0}
            onChange={handleInputChange}
            min='0'
            step='0.01'
            className={`w-full p-2 border rounded-md ${
              clickedSubmit && product.price === undefined
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />

          {clickedSubmit &&
            (product.price === undefined || product.price < 0) && (
              <p className='text-red-500 text-xs mt-1'>
                Product price is required
              </p>
            )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Stock*
          </label>

          <input
            type='number'
            name='stock'
            value={product.stock || 0}
            onChange={handleInputChange}
            min='0'
            className={`w-full p-2 border rounded-md ${
              clickedSubmit && product.stock === undefined
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />

          {clickedSubmit &&
            (product.stock === undefined || product.stock < 0) && (
              <p className='text-red-500 text-xs mt-1'>
                Product stock is required
              </p>
            )}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Category*
          </label>

          <select
            name='category'
            value={product.category}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${
              clickedSubmit && !product.category
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          >
            <option value=''>Select category</option>

            {Object.values(ProductCategory).map((category: any) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {clickedSubmit && !product.category && (
            <p className='text-red-500 text-xs mt-1'>
              Product category is required
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Status
          </label>

          <select
            name='status'
            value={product.status}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md'
          >
            {Object.values(ProductStatus).map((status: any) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex items-center'>
        <input
          type='checkbox'
          id='isCustomizable'
          name='isCustomizable'
          checked={product.isCustomizable}
          onChange={handleInputChange}
          className='h-4 w-4 text-blue-600 border-gray-300 rounded'
        />
        <label
          htmlFor='isCustomizable'
          className='ml-2 block text-sm text-gray-700'
        >
          Customizable product
        </label>
      </div>
    </div>
  );
};

export default ProductBasicInfoComponent;
