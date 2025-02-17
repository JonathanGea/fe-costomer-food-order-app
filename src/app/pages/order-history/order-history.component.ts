import { Component, OnInit } from '@angular/core';
import { OrderHistoryCardComponent } from '../order-history-card/order-history-card.component';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../core/models/order.model';
import { ImportsPrimengModule } from '../../shared/imports/imports';

@Component({
  selector: 'app-order-history',
  imports: [OrderHistoryCardComponent, ImportsPrimengModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: Order[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrderHistory()
    console.log('this.orderHistory :>> ', this.orderHistory);
  }

  getOrderHistory() {
    this.orderService.getOrderHistoy().subscribe({
      next: (orderHistory) => {
        this.orderHistory = orderHistory;
      },
      error: (error) => {
        console.log('error :>> ', error);
      },
      complete: () => {
        console.log('Product retrieval complete');
      },
    });
  }


}
