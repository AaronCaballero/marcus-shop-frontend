import Image from 'next/image';
import React, { useState } from 'react';
import { Product } from '../../types/product';
import StatusBadge from '../StatusBadge';

interface AdminProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onCreateNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
  onView,
  onCreateNew,
  onEdit,
  onDelete,
}) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleItemClick = (product: Product) => {
    onView(product);
  };

  const handleEditClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDelete(id);
  };

  const handleConfirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
    setConfirmDelete(null);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDelete(null);
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 xl:min-w-[1000px] max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>
          Products Management
        </h2>

        <button
          onClick={onCreateNew}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center cursor-pointer'
        >
          Create New Product
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Product
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
                Status
              </th>

              <th className='py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className='hover:bg-gray-50 cursor-pointer'
                  onClick={() => handleItemClick(product)}
                >
                  <td className='py-4 px-4'>
                    <div className='flex items-center'>
                      <div className='h-10 w-10 flex-shrink-0 mr-4 bg-gray-200 rounded-md overflow-hidden relative'>
                        <Image
                          src='/bicycle.svg'
                          alt={product.name}
                          fill
                          className='h-full w-full object-cover'
                        />
                      </div>

                      <div className='font-medium text-gray-900'>
                        {product.name}
                      </div>
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    <div className='text-sm text-gray-500 max-w-xs truncate'>
                      {product.description || 'No description'}
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    <div className='text-sm font-medium text-gray-900'>
                      {product.price ? `${product.price.toFixed(2)}€` : '-'}
                    </div>
                  </td>

                  <td className='py-4 px-4'>
                    <div className='text-sm text-gray-900'>{product.stock}</div>
                  </td>

                  <td className='py-4 px-4'>
                    <StatusBadge status={product.status} />
                  </td>

                  <td className='py-4 px-4'>
                    <div className='flex items-center space-x-4'>
                      <button
                        onClick={(e) => handleEditClick(product, e)}
                        className='text-indigo-600 hover:text-indigo-900 focus:outline-none cursor-pointer'
                      >
                        Edit
                      </button>

                      {confirmDelete === product.id ? (
                        <div
                          className='flex items-center space-x-2'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => handleConfirmDelete(product.id, e)}
                            className='text-red-600 hover:text-red-900 text-xs font-medium cursor-pointer'
                          >
                            Confirm
                          </button>

                          <button
                            onClick={handleCancelDelete}
                            className='text-gray-600 hover:text-gray-900 text-xs font-medium cursor-pointer'
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => handleDeleteClick(product.id, e)}
                          className='text-red-600 hover:text-red-900 focus:outline-none cursor-pointer'
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='py-6 px-4 text-center text-gray-500'>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductTable;
