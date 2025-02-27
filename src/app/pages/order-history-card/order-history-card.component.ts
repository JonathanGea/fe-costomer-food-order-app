import { Component, Input } from '@angular/core';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { Order } from '../../core/models/order.model';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-order-history-card',
  imports: [ImportsPrimengModule],
  templateUrl: './order-history-card.component.html',
  styleUrl: './order-history-card.component.css',
})
export class OrderHistoryCardComponent {
  @Input() order!: Order;

  constructor(
    public derect : DerectService
  ){

  }
}
