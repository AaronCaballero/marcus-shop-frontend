import { CreateProduct, Product } from '../types/product';
import { ProhibitedCustomization } from '../types/prohibited-customization';
import { httpService } from './httpService';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;

export const productService = {
  async create(createProduct: CreateProduct): Promise<Product | null> {
    try {
      const url = `${API_URL}`;

      const data = await httpService.post(url, createProduct);

      return data as Product;
    } catch (error) {
      console.error('Error creating the product:', error);
      return null;
    }
  },

  async getAll(): Promise<Product[] | null> {
    try {
      const url = `${API_URL}`;

      return await httpService.get(url);
    } catch (error) {
      console.error('Error getting products:', error);
      return null;
    }
  },

  async getOne(productId: string): Promise<Product | null> {
    try {
      const url = `${API_URL}/${productId}`;

      const data = await httpService.get(url);

      return data as Product;
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  },

  async delete(productId: string): Promise<boolean | null> {
    try {
      const url = `${API_URL}/${productId}`;

      const data = await httpService.delete(url);

      return data as boolean;
    } catch (error) {
      console.error('Error deleting the product:', error);
      return null;
    }
  },

  async getProhibitedCustomizationsByProduct(
    productId: string
  ): Promise<ProhibitedCustomization[] | null> {
    try {
      const url = `${API_URL}/${productId}/prohibited-customization`;

      const data = await httpService.get(url);

      return data as ProhibitedCustomization[];
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  },
};
