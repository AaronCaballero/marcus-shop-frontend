import { ProductCategory } from './product';
import { Timestampable } from './utils';

export interface ProductCustomization extends Timestampable {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: ProductCategory;
  type: ProductCustomizationType;
  stock: number;
  isRequired: boolean;
}

// export interface CreateProductCustomization {
//   name: string;
//   description?: string;
//   price?: number;
//   category: ProductCategory;
//   type: ProductCustomizationType;
//   stock: number;
//   isRequired: boolean;
// }

export enum ProductCustomizationType {
  FrameType = 'frame_type',
  FrameFinish = 'frame_finish',
  Wheels = 'wheels',
  RimColor = 'rim_color',
  Chain = 'chain',
  Color = 'color',
  Size = 'size',
  Material = 'material',
  AditionalFeature = 'aditional_feature',
}

export const ProductCustomizationTypesNames = {
  frame_type: 'Frame type',
  frame_finish: 'Frame finish',
  wheels: 'Wheels',
  rim_color: 'Rim color',
  chain: 'Chain',
  color: 'Color',
  size: 'Size',
  material: 'Material',
  aditional_feature: 'Aditional feature',
};
