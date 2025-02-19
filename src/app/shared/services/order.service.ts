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
  private readonly STORAGE_KEY_ORDER = 'orders';
  private readonly STORAGE_KEY_ORDERS = 'order';

  products: Product[] = [];
  order: Order = {
    id: 'null',
    code: 'null',
    totalPrice: 0,
    createdAt: new Date(),
    productOrders: this.products,
  };

  constructor(private readonly http: HttpClient) {}

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

  getOrders(): Order[] {
    const storedOrders = localStorage.getItem(this.STORAGE_KEY_ORDER);
    return storedOrders ? JSON.parse(storedOrders) : [];
  }

  saveOrders(orders: Order[]): void {
    localStorage.setItem(this.STORAGE_KEY_ORDER, JSON.stringify(orders));
  }

  incrementQuantity(product: Product): void {
    const existingProductOrder = this.order.productOrders.find(
      (po) => po.id === product.id
    );

    if (existingProductOrder) {
      existingProductOrder.quantity++;
    } else {
      product.quantity = 1;
      this.order.productOrders.push(product);
    }
  }

  decrementQuantity(product: Product): void {
    const existingProductOrder = this.order.productOrders.find(
      (po: Product) => po.id === product.id
    );

    if (existingProductOrder) {
      existingProductOrder.quantity--;

      if (existingProductOrder.quantity <= 0) {
        this.order.productOrders = this.order.productOrders.filter(
          (po: Product) => po.id !== product.id
        );
      }
    }
  }

  getProductQuantity(id: string): number {
    console.log('getProductQuantity called with id:', id);

    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product.quantity;
    } else {
      return 0;
    }
  }

  getProductTotalQuantity(): number {
    let totalQuantity = 0;

    if (this.products) {
      // Pastikan productOrders ada
      for (const productOrder of this.products) {
        totalQuantity += productOrder.quantity; // Asumsi: productOrder memiliki properti 'quantity'
      }
    }
    return totalQuantity;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    if (this.products) {
      // Pastikan productOrders ada
      for (const productOrder of this.products) {
        totalPrice += productOrder.quantity * productOrder.price; // Asumsi: productOrder memiliki properti 'quantity'
      }
    }
    return totalPrice;
  }
}
