import React, { useState } from 'react';
import { ProductCustomization } from '../../types/productCustomization';

interface Props {
  customizations: { [key: string]: ProductCustomization[] } | {};
  onAddCustomization: (customization: ProductCustomization) => void;
  onCreateNew: () => void;
}

const ProductCustomizationDropdownComponent: React.FC<Props> = ({
  customizations,
  onAddCustomization,
  onCreateNew,
}) => {
  const [selected, setSelected] = useState('none');

  const itemsMap: any = {};
  Object.values(customizations).forEach((items) => {
    items.forEach((item: ProductCustomization) => {
      const itemId = item.id;
      itemsMap[itemId] = item;
    });
  });

  const handleChange = (e: any) => {
    onAddCustomization(itemsMap[e.target.value]);
    setSelected('none');
  };

  return (
    <div className='flex'>
      <div className='w-3/4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Select customization
        </label>

        <select
          name='customization'
          value={selected}
          onChange={handleChange}
          className={'w-full p-2 border rounded-md border-gray-300'}
        >
          <option value='none'>Select customization</option>
          {Object.entries(customizations).map(([type, items]) => (
            <React.Fragment key={type}>
              <option disabled className='font-semibold bg-gray-100 text-right'>
                {type}
              </option>

              {items.map((item: any, index: number) => (
                <option
                  key={`${type}-${index}`}
                  value={item.id || index}
                  className='pl-4'
                >
                  {item.name || `Item ${index + 1}`}
                </option>
              ))}
            </React.Fragment>
          ))}
        </select>
      </div>

      <div className='w-1/4 flex justify-end items-end'>
        <button
          onClick={(e) => onCreateNew()}
          className='w-auto h-auto py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300 cursor-pointer'
        >
          Create new
        </button>
      </div>
    </div>
  );
};

export default ProductCustomizationDropdownComponent;
