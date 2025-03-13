import { CreateProduct, Product } from '../types/product';
import {
  CreateProductCustomization,
  ProductCustomization,
} from '../types/productCustomization';
import { ProhibitedCustomization } from '../types/prohibitedCustomization';
import { httpService } from './httpService';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;

export const productService = {
  async create(createProduct: CreateProduct): Promise<Product | null> {
    try {
      const url = `${API_URL}`;

      return (await httpService.post(url, createProduct)) as Product;
    } catch (error) {
      console.error('Error creating the product:', error);
      return null;
    }
  },

  async getAll(): Promise<Product[] | null> {
    try {
      const url = `${API_URL}`;

      return (await httpService.get(url)) as Product[];
    } catch (error) {
      console.error('Error getting products:', error);
      return null;
    }
  },

  async getOne(productId: string): Promise<Product | null> {
    try {
      const url = `${API_URL}/${productId}`;

      return (await httpService.get(url)) as Product;
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  },

  async delete(productId: string): Promise<boolean | null> {
    try {
      const url = `${API_URL}/${productId}`;

      return (await httpService.delete(url)) as boolean;
    } catch (error) {
      console.error('Error deleting the product:', error);
      return null;
    }
  },

  async getAllCustomizations(): Promise<ProductCustomization[] | null> {
    try {
      const url = `${API_URL}/customization`;

      return (await httpService.get(url)) as ProductCustomization[];
    } catch (error) {
      console.error('Error getting products customizations:', error);
      return null;
    }
  },

  async createCustomization(
    createCustomization: CreateProductCustomization
  ): Promise<ProductCustomization | null> {
    try {
      const url = `${API_URL}/customization`;

      return (await httpService.post(
        url,
        createCustomization
      )) as ProductCustomization;
    } catch (error) {
      console.error('Error creating the product customization:', error);
      return null;
    }
  },

  async updateCustomization(
    customization: ProductCustomization
  ): Promise<ProductCustomization | null> {
    try {
      const url = `${API_URL}/customization/${customization.id}`;

      return (await httpService.patch(
        url,
        customization
      )) as ProductCustomization;
    } catch (error) {
      console.error('Error updating the product customization:', error);
      return null;
    }
  },

  async getGroupedCustomizations(): Promise<
    { [key: string]: ProductCustomization[] } | {} | null
  > {
    try {
      const url = `${API_URL}/customization/grouped`;

      return await httpService.get(url);
    } catch (error) {
      console.error('Error getting grouped product customizations:', error);
      return null;
    }
  },

  async getProhibitedCustomizationsByProduct(
    productId: string
  ): Promise<ProhibitedCustomization[] | null> {
    try {
      const url = `${API_URL}/${productId}/prohibited-customization`;

      return (await httpService.get(url)) as ProhibitedCustomization[];
    } catch (error) {
      console.error(
        'Error getting prohibited customizations by product:',
        error
      );
      return null;
    }
  },
};
