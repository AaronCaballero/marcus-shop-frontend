import React, { useState } from 'react';
import { ProductCustomization } from '../../types/product-customization';
import ProductCustomizationCreateComponent from './ProductCustomizationCreateComponent';
import ProductCustomizationDropdownComponent from './ProductCustomizationDropdownComponent';
import ProductCustomizationItem from './ProductCustomizationItemComponent';

interface Props {
  isCustomizable: boolean;
  customizations: ProductCustomization[];
  groupedCustomizations: { [key: string]: ProductCustomization[] } | {};
  onAddCustomization: (customization: ProductCustomization) => void;
  onRemoveCustomization: (id: string) => void;
  showAdd?: boolean;
}

const ProductCustomizationsComponent: React.FC<Props> = ({
  isCustomizable,
  customizations,
  groupedCustomizations,
  onAddCustomization,
  onRemoveCustomization,
  showAdd = true,
}) => {
  const [isCreateNew, SetIsCreateNew] = useState<boolean>(false);

  if (!isCustomizable) {
    return (
      <div className='space-y-6'>
        <h2 className='text-lg font-semibold text-gray-800 border-b pb-2'>
          Customization Options
        </h2>
        <div className='flex items-center justify-center h-64 bg-gray-50 rounded-md'>
          <p className='text-gray-500'>Enable customization to add options</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-semibold text-gray-800 border-b pb-2'>
        Customization Options
      </h2>

      {showAdd && !isCreateNew && (
        <ProductCustomizationDropdownComponent
          customizations={groupedCustomizations}
          onAddCustomization={onAddCustomization}
          onCreateNew={() => SetIsCreateNew(true)}
        />
      )}

      {showAdd && isCreateNew && (
        <ProductCustomizationCreateComponent
          onAddCustomization={onAddCustomization}
          onCreateNew={() => SetIsCreateNew(false)}
        />
      )}

      <div>
        <h3 className='text-md font-medium text-gray-700 mb-3'>
          Current Customizations
        </h3>

        {customizations.length > 0 ? (
          <div className='space-y-3 max-h-96 overflow-y-auto'>
            {customizations.map((custom) => (
              <ProductCustomizationItem
                key={custom.id}
                customization={custom}
                onRemove={onRemoveCustomization}
              />
            ))}
          </div>
        ) : (
          <p className='text-gray-500 italic'>No customizations added yet</p>
        )}
      </div>
    </div>
  );
};

export default ProductCustomizationsComponent;
