import { Product } from './product.model';

export interface ProductOrder {
  id: string;
  name: string;
  quantity: number;
  subTotalPrice: number;
}

export interface Order {
  id: string;
  code: string;
  createdAt: Date;
  totalPrice: number;
  tax: number;
  subTotalPrice: number;
  customerName: string;
  type: string;
  tableId: string;
  adminId: string;
  productOrders: Product[];
}
