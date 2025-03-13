import {
  ProductCustomization,
  ProductCustomizationTypesNames,
} from '../../types/product-customization';

interface Props {
  customization: ProductCustomization;
  onRemove: (id: string) => void;
}

const ProductCustomizationItem: React.FC<Props> = ({
  customization,
  onRemove,
}) => {
  return (
    <div className='flex justify-between items-center bg-gray-50 p-3 rounded-md'>
      <div>
        <span className='font-medium'>{customization.name}</span>

        <div className='text-sm text-gray-500'>
          <span className='mr-3'>
            Type:{' '}
            {
              ProductCustomizationTypesNames[
                customization.type as keyof typeof ProductCustomizationTypesNames
              ]
            }
          </span>

          <span className='mr-3'>
            Price: +{customization.price?.toFixed(2)}€
          </span>

          <span className='mr-3'>Stock: {customization.stock}</span>

          {customization.isRequired && (
            <span className='text-blue-600'>Required</span>
          )}
        </div>
      </div>

      <button
        type='button'
        onClick={() => onRemove(customization.id)}
        className='text-red-500 hover:text-red-700 cursor-pointer'
      >
        <span className='sr-only'>Remove</span>✕
      </button>
    </div>
  );
};

export default ProductCustomizationItem;
