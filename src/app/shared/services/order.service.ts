import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Order, ProductOrder } from '../../core/models/order.model';
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
    tax: 0,
    subTotalPrice: 0,
    customerName: "budiiiii",
    type: "dine in",
    tableId: "550e8400-e29b-41d4-a716-446655440000",
    adminId: "660e8400-e29b-41d4-a716-446655440111",
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
      order.code = 'ABC' + this.generateRandomCode(7); // Generate a random code of length 10
      const uuid = this.generateUUID();
      console.log('uuid :>> ', uuid);
      order.id = uuid;
      order.totalPrice = this.getTotalPrice();
      // Tambahkan order ke orders
      orders.unshift(order);
      this.submitOrder(order);
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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0; // Generate a random number between 0 and 15
      const v = c === 'x' ? r : (r & 0x3) | 0x8; // For 'y', ensure the version is 4
      return v.toString(16); // Convert to hexadecimal
    });
  }

  // ----------------------------------------------------------------------------------------

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

  getDetailOrder(id: string): Observable<Order> {
    return this.http
      .get<{
        isSuccess: boolean;
        data: Order;
        timestamp: string;
        errors: any;
      }>(`${this.apiUrl}/${id}`) // Corrected URL concatenation
      .pipe(
        map((response) => {
          console.log('Response received: ', response);
          return response.data;
        }),
        catchError((error) => {
          console.error('Error occurred while fetching order details:', error);
          return throwError(error); // Handle the error appropriately
        })
      );
  }

  submitOrder(order : Order): void {
    this.insertOrder(order).subscribe({
      next: (orderData) => {
        console.log('Order successfully inserted:', orderData);
        // Additional logic after successful order insertion
      },
      error: (error) => {
        console.error('Failed to insert order:', error);
        // Handle errors here, such as showing an error message to the user
      },
    });
  }
  insertOrder(order: Order): Observable<Order> {
    console.log('order :>> ', order);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<{
        isSuccess: boolean;
        data: Order;
        timestamp: string;
        errors: any;
      }>(this.apiUrl, order, { headers })
      .pipe(
        map((response) => {
          console.log('Response received: ', response);
          return response.data;
        }),
        catchError((error) => {
          console.error('Error occurred while fetching order details:', error);
          return throwError(error); // Handle the error appropriately
        })
      );
  }
}
