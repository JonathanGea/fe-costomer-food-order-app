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

  order: Order = {
    id: 'null',
    code: 'null',
    totalPrice: 0,
    createdAt: new Date(),
    productOrders: [],
  };

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
    const storedOrders = localStorage.getItem(this.STORAGE_KEY_ORDER);
    return storedOrders ? JSON.parse(storedOrders) : null;
  }

  getProductOrder(): Product[] {
    console.log('this.order.productOrders :>> ', this.order.productOrders);
    return this.order.productOrders;
  }

  saveOrder(order: Order): void {
    localStorage.setItem(this.STORAGE_KEY_ORDER, JSON.stringify(order));
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
}