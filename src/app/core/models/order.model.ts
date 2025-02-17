export interface ProductOrder {
  name: string;
  quantity: number;
  subTotalPrice: number;
}

export interface Order {
  id: string;
  code: string;
  createdAt: Date;
  totalPrice: number;
  productOrders: ProductOrder[];
}
