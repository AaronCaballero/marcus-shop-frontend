import { ProductStatus } from '../types/product';
import { ProductCustomizationStatus } from '../types/productCustomization';

interface StatusProps {
  status: ProductStatus | ProductCustomizationStatus;
}

const StatusBadge: React.FC<StatusProps> = ({ status }) => {
  switch (status) {
    case ProductStatus.Active || ProductCustomizationStatus.Active:
      return (
        <span className='px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'>
          Available
        </span>
      );
    case ProductStatus.OutOfStock:
      return (
        <span className='px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'>
          Out of stock
        </span>
      );
    case ProductCustomizationStatus.TemporarilyOutOfStock:
      return (
        <span className='px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'>
          Temporarily Out of stock
        </span>
      );
    case ProductStatus.Discontinued || ProductCustomizationStatus.Discontinued:
      return (
        <span className='px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800'>
          Discontinued
        </span>
      );
    default:
      return null;
  }
};

export default StatusBadge;
