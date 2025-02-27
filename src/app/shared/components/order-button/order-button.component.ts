import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DerectService } from '../../services/derect.service';
import { Imports } from '../../imports/imports';
import { ImportsPrimengModule } from '../../imports/imports-primeng';
import { LoadingComponent } from '../loading/loading.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-order-button',
  imports: [Imports, ImportsPrimengModule, LoadingComponent],
  template: `
    <app-loading [isLoading]="isloading"></app-loading>

    <div
      style="
    position: fixed;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    max-width: 400px;
    width: 95%;
  "
    >
      <div
        class="card w-100 d-flex justify-content-between p-2"
        style="align-items: center"
        *ngIf="this.orderService.getProductTotalQuantity() > 0"
      >
        <div>
          <div class="fs-8">Total Price</div>
          <div class="fw-bold fs-7">
            {{ this.orderService.getTotalPrice() | currency : 'Rp' }}
          </div>
        </div>
        <div>
          <p-button
            badge="{{ this.orderService.getProductTotalQuantity() }}"
            label="Check Out"
            icon="pi pi-shopping-cart"
            severity="contrast"
            (onClick)="onClick()"
          />
        </div>
      </div>
    </div>
  `,
})
export class OrderButtonComponent {
  isloading: boolean = false;

  constructor(
    public orderService: OrderService,
    public derect: DerectService
  ) {}

  onClick() {
    this.orderService.doOrder();
    this.isloading = true;

    timer(1000).subscribe(() => {
      this.derect.refreshPage()
      
      // Delay 5 seconds
      this.derect.toOrderDetailPage('id');
    });
  }
}
