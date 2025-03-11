import { ProductCustomization } from './product-customization';
import { Timestampable } from './utils';

export interface Product extends Timestampable {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  status: ProductStatus;
  stock: number;
  isCustomizable: boolean;
  customizations?: ProductCustomization[];
}

export interface CreateProduct {
  name: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  status: ProductStatus;
  stock: number;
  isCustomizable: boolean;
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
