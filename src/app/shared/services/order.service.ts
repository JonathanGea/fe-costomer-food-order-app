import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../../core/models/order.model';
import { Product } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = environment.apiUrl + '/order';
  private readonly STORAGE_KEY_ORDER = 'order';
  private readonly STORAGE_KEY_ORDERS = 'orders';

  order: Order = {
    id: 'null',
    code: 'null',
    totalPrice: 0,
    createdAt: new Date(),
    productOrders: [],
  };

  orders: Order[] | undefined;

  constructor(private readonly http: HttpClient) {
    const storedOrder = this.getOrder();
    if (storedOrder) {
      this.order = storedOrder;
    }
  }

  getOrderHistoy(): Observable<Order[]> {
    return this.http
      .get<{
        isSuccess: boolean;
        data: Order[];
        timestamp: string;
        errors: any;
      }>(this.apiUrl)
      .pipe(
        map((response) => {
          console.log('Response received: ', response);
          return response.data;
        })
      );
  }

  getOrder(): Order | null {
    const storedOrder = localStorage.getItem(this.STORAGE_KEY_ORDER);
    return storedOrder ? JSON.parse(storedOrder) : null;
  }

  getOrders(): Order[] {
    const storedOrders = localStorage.getItem(this.STORAGE_KEY_ORDERS);
    return storedOrders ? JSON.parse(storedOrders) : [];
  }

  getProductOrder(): Product[] {
    console.log('this.order.productOrders :>> ', this.order.productOrders);
    return this.order.productOrders;
  }

  saveOrder(order: Order): void {
    localStorage.setItem(this.STORAGE_KEY_ORDER, JSON.stringify(order));
  }

  doOrder() {
    console.log('this :>> ', this);

    // Ambil data dari STORAGE_KEY_ORDER
    const storedOrder = localStorage.getItem(this.STORAGE_KEY_ORDER);
    if (!storedOrder) {
      console.error('No order found in STORAGE_KEY_ORDER');
      return;
    }

    // Ambil data dari STORAGE_KEY_ORDERS
    const storedOrders = localStorage.getItem(this.STORAGE_KEY_ORDERS);
    let orders: Order[] = [];

    try {
      // Pastikan storedOrders adalah array
      orders = storedOrders ? JSON.parse(storedOrders) : [];
      if (!Array.isArray(orders)) {
        console.error(
          'Stored orders is not an array, resetting to empty array'
        );
        orders = [];
      }
    } catch (e) {
      console.error(
        'Failed to parse stored orders, resetting to empty array',
        e
      );
      orders = [];
    }

    try {
      // Parse storedOrder
      const order: Order = JSON.parse(storedOrder);

      // Generate random code and assign to order
      order.code = "ABC" + this.generateRandomCode(7); // Generate a random code of length 10
      order.totalPrice = this.getTotalPrice();
      // Tambahkan order ke orders
      orders.push(order);
    } catch (e) {
      console.error('Failed to parse stored order', e);
      return;
    }

    // Simpan data storedOrders yang sudah diperbarui
    localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify(orders));

    // Optional: Clear the current order after saving
    localStorage.removeItem(this.STORAGE_KEY_ORDER);
  }
  incrementQuantity(product: Product): void {
    if (!this.order?.productOrders) {
      console.error('Order or productOrders is undefined');
      return;
    }

    const existingProductOrder = this.order.productOrders.find(
      (po) => po.id === product.id
    );

    if (existingProductOrder) {
      existingProductOrder.quantity = (existingProductOrder.quantity || 0) + 1;
    } else {
      this.order.productOrders.push({ ...product, quantity: 1 });
    }

    this.saveOrder(this.order);
  }

  decrementQuantity(product: Product): void {
    if (!this.order?.productOrders) {
      console.error('Order or productOrders is undefined');
      return;
    }

    const existingProductOrder = this.order.productOrders.find(
      (po) => po.id === product.id
    );

    if (existingProductOrder && existingProductOrder.quantity > 0) {
      existingProductOrder.quantity--;

      if (existingProductOrder.quantity <= 0) {
        this.order.productOrders = this.order.productOrders.filter(
          (po) => po.id !== product.id
        );
      }
    }

    this.saveOrder(this.order);
  }

  getProductQuantity(id: string): number {
    const productOrder = this.order?.productOrders?.find((po) => po.id === id);
    return productOrder ? productOrder.quantity ?? 0 : 0;
  }

  getProductTotalQuantity(): number {
    let totalQuantity = 0;

    if (this.order.productOrders) {
      for (const productOrder of this.order.productOrders) {
        totalQuantity += productOrder.quantity ?? 0;
      }
    }
    return totalQuantity;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    if (this.order.productOrders) {
      for (const productOrder of this.order.productOrders) {
        totalPrice += (productOrder.quantity ?? 0) * (productOrder.price || 0);
      }
    }
    return totalPrice;
  }

  generateRandomCode(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
