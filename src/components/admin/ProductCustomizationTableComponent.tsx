import React, { useState } from 'react';
import {
  ProductCustomization,
  ProductCustomizationTypesNames,
} from '../../types/productCustomization';
import StatusBadge from '../StatusBadge';

interface AdminProductCustomizationTableProps {
  customizations: ProductCustomization[];
  onMarkOutOfStock: (customization: ProductCustomization) => void;
}

const AdminProductCustomizationTable: React.FC<
  AdminProductCustomizationTableProps
> = ({ customizations, onMarkOutOfStock }) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleMarkOutOfStock = (
    customization: ProductCustomization,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    onMarkOutOfStock(customization);
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 xl:min-w-[1000px] max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>
          Customizations Management
        </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Customization
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Description
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Price
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Stock
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Type
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Status
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {customizations.length > 0 ? (
              customizations.map((customization) => (
                <tr key={customization.id} className='hover:bg-gray-50'>
                  <td className='py-4 px-4'>
                    <div className='flex items-center'>
                      <div className='font-medium text-gray-900'>
                        {customization.name}
                      </div>
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    <div className='text-sm text-gray-500 max-w-xs truncate'>
                      {customization.description || 'No description'}
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    <div className='text-sm font-medium text-gray-900'>
                      {customization.price
                        ? `${customization.price.toFixed(2)}€`
                        : '-'}
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    <div className='text-sm text-gray-900'>
                      {customization.stock}
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    {
                      ProductCustomizationTypesNames[
                        customization.type as keyof typeof ProductCustomizationTypesNames
                      ]
                    }
                  </td>

                  <td className='py-4 px-4'>
                    <StatusBadge status={customization.status} />
                  </td>

                  <td className='py-4 px-4'>
                    <div className='flex items-center space-x-4'>
                      <button
                        onClick={(e) => handleMarkOutOfStock(customization, e)}
                        className='text-indigo-600 hover:text-indigo-900 focus:outline-none cursor-pointer'
                      >
                        Mark out of stock
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='py-6 px-4 text-center text-gray-500'>
                  No customizations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductCustomizationTable;
