import { Component, OnInit } from '@angular/core';
import { OrderHistoryCardComponent } from '../order-history-card/order-history-card.component';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../core/models/order.model';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-order-history',
  imports: [OrderHistoryCardComponent, ImportsPrimengModule, LoadingComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: Order[] = [];
  isLoading = true; 

  constructor(private readonly orderService: OrderService, private readonly router: Router) {}
  ngOnInit(): void {
    this.getOrderHistory();
    
  }

  getOrderHistory() {

    this.orderHistory = this.orderService.getOrders();

    this.isLoading = false; 

  }

  derectToMenuPage() {
    this.router.navigate(['/']);
  }

  
}
