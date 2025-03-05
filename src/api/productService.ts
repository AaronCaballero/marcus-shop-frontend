import { CreateProduct, Product } from '../types/product';
import { httpService } from './httpService';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;

export const productService = {
  async createProduct(
    createProduct: CreateProduct,
    token: string
  ): Promise<any | null> {
    try {
      const url = `${API_URL}/create`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = await httpService.post(url, createProduct, headers);

      return data as Product;
    } catch (error) {
      console.error('Error creating the product:', error);
      return null;
    }
  },

  async getProducts(token: any): Promise<Product[] | null> {
    try {
      const url = `${API_URL}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      return await httpService.get(url, headers);
    } catch (error) {
      console.error('Error getting products:', error);
      return null;
    }
  },

  async getProduct(productId: string, token: any): Promise<Product | null> {
    try {
      const url = `${API_URL}/${productId}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = await httpService.get(url, headers);

      return data as Product;
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  },
};
