import React, { useState } from 'react';
import { ProductCategory } from '../../types/product';
import {
  CreateProductCustomization,
  newProductCustomization,
  ProductCustomization,
  ProductCustomizationType,
  ProductCustomizationTypesNames,
} from '../../types/product-customization';

interface Props {
  onAddCustomization: (customization: ProductCustomization) => void;
  onCreateNew: () => void;
}

const ProductCustomizationCreateComponent: React.FC<Props> = ({
  onAddCustomization,
  onCreateNew,
}) => {
  const [newCustomization, setNewCustomization] =
    useState<CreateProductCustomization>(newProductCustomization);

  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);

  const handleCustomizationChange = (e: any) => {
    const { type, name, value } = e.target;

    switch (type) {
      case 'checkbox':
        setNewCustomization({
          ...newCustomization,
          [name]: e.target.checked,
        });
        break;
      case 'number':
        setNewCustomization({
          ...newCustomization,
          [name]: value === '' ? 0 : Number(value),
        });
        break;
      default:
        setNewCustomization({
          ...newCustomization,
          [name]: value,
        });
        break;
    }
  };

  const validateForm = (): boolean => {
    if (
      newCustomization.name &&
      newCustomization.price >= 0 &&
      newCustomization.stock >= 0 &&
      newCustomization.category
    )
      return true;

    return false;
  };

  const handleAddCustomization = () => {
    setClickedSubmit(true);

    if (!validateForm()) return;

    onAddCustomization(newCustomization as ProductCustomization);
    setNewCustomization(newProductCustomization());
    setClickedSubmit(false);
  };

  return (
    <div className='space-y-6'>
      <div className='bg-gray-50 p-4 rounded-md'>
        <div className='flex justify-between items-center'>
          <h3 className='text-md font-medium text-gray-700 mb-3'>
            Add New Customization
          </h3>

          <button
            onClick={onCreateNew}
            className='py-1 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer'
          >
            Cancel
          </button>
        </div>

        <div className='grid gap-4 mb-3'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Name*
            </label>

            <input
              type='text'
              name='name'
              value={newCustomization.name}
              onChange={handleCustomizationChange}
              className={`w-full p-2 border rounded-md ${
                clickedSubmit && !newCustomization.name
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />

            {clickedSubmit && !newCustomization.name && (
              <p className='text-red-500 text-xs mt-1'>
                Customization name is required
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-3'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category*
            </label>

            <select
              name='category'
              value={newCustomization.category}
              onChange={handleCustomizationChange}
              className={`w-full p-2 border rounded-md ${
                clickedSubmit && !newCustomization.category
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

            {clickedSubmit && !newCustomization.category && (
              <p className='text-red-500 text-xs mt-1'>
                Customization category is required
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Type
            </label>

            <select
              name='type'
              value={newCustomization.type}
              onChange={handleCustomizationChange}
              className={`w-full p-2 border rounded-md ${
                clickedSubmit && !newCustomization.type
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            >
              <option value=''>Select type</option>

              {Object.entries(ProductCustomizationType).map(([key, value]) => (
                <option key={key} value={value}>
                  {
                    ProductCustomizationTypesNames[
                      value as keyof typeof ProductCustomizationTypesNames
                    ]
                  }
                </option>
              ))}
            </select>
            {clickedSubmit && !newCustomization.type && (
              <p className='text-red-500 text-xs mt-1'>
                Customization type is required
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-3'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Price (€)*
            </label>

            <input
              type='number'
              name='price'
              value={newCustomization.price}
              onChange={handleCustomizationChange}
              min='0'
              step='0.01'
              className={`w-full p-2 border rounded-md ${
                clickedSubmit && newCustomization.price === undefined
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />

            {clickedSubmit &&
              (newCustomization.price === undefined ||
                newCustomization.price < 0) && (
                <p className='text-red-500 text-xs mt-1'>
                  Customization price is required
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
              value={newCustomization.stock}
              onChange={handleCustomizationChange}
              min='0'
              className={`w-full p-2 border rounded-md ${
                clickedSubmit && newCustomization.stock === undefined
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />

            {clickedSubmit &&
              (newCustomization.stock === undefined ||
                newCustomization.stock < 0) && (
                <p className='text-red-500 text-xs mt-1'>
                  Customization stock is required
                </p>
              )}
          </div>
        </div>

        <div className='flex items-center mb-4'>
          <input
            type='checkbox'
            id='isRequired'
            name='isRequired'
            checked={newCustomization.isRequired}
            onChange={handleCustomizationChange}
            className='h-4 w-4 text-blue-600 border-gray-300 rounded'
          />

          <label
            htmlFor='isRequired'
            className='ml-2 block text-sm text-gray-700'
          >
            Required customization
          </label>
        </div>

        <button
          type='button'
          onClick={handleAddCustomization}
          className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer'
        >
          Add Customization
        </button>
      </div>
    </div>
  );
};

export default ProductCustomizationCreateComponent;
