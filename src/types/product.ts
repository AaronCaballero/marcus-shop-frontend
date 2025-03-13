import { ProductCustomization } from './productCustomization';
import { Timestampable } from './utils';

export interface Product extends Timestampable {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: ProductCategory;
  status: ProductStatus;
  stock: number;
  isCustomizable: boolean;
  customizations?: ProductCustomization[];
  groupedCustomizations?: { [key: string]: ProductCustomization[] } | {};
}

export interface CreateProduct {
  name: string;
  description?: string;
  price: number;
  category?: ProductCategory;
  status: ProductStatus;
  stock: number;
  isCustomizable: boolean;
  customizations?: ProductCustomization[];
}

export enum ProductCategory {
  Bicycles = 'bicycles',
  Other = 'other',
}

export enum ProductStatus {
  Active = 'active',
  Discontinued = 'discontinued',
  OutOfStock = 'out_of_stock',
}

export const newProduct = (): CreateProduct => {
  return {
    name: '',
    description: '',
    price: 0,
    category: undefined,
    status: ProductStatus.Active,
    stock: 0,
    isCustomizable: false,
    customizations: [],
  };
};
