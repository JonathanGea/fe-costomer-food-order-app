import { Component, OnInit } from '@angular/core';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { DerectService } from '../../shared/services/derect.service';
import { BackToMenuPageComponent } from "../../shared/components/back-to-menu-page/back-to-menu-page.component";
import { Order } from '../../core/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-history-detail',
  imports: [ImportsPrimengModule, BackToMenuPageComponent],
  templateUrl: './order-history-detail.component.html',
})
export class OrderHistoryDetailComponent implements OnInit {

  order: Order| null = null;

  constructor(
    private readonly route: ActivatedRoute,
    public derect : DerectService,
    private readonly orderService: OrderService
  ){
    
  }
    ngOnInit(): void {
      let id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.orderService.getDetailOrder(id).subscribe(
          (data) => {
            this.order = data;
            
          },
          (error) => {
            console.error('Error fetching order details:', error);
          }
        );
      }
    }
}
