import { ProductStatus } from '../types/product';

interface StatusProps {
  status: ProductStatus;
}

const StatusBadge: React.FC<StatusProps> = ({ status }) => {
  switch (status) {
    case ProductStatus.Active:
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
    case ProductStatus.Discontinued:
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
