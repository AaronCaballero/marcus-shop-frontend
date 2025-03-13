import { ProductCustomization } from './productCustomization';
import { Timestampable } from './utils';

export interface ProhibitedCustomization extends Timestampable {
  id: string;
  customizations?: ProductCustomization[];
  customizationIds?: string[];
}
