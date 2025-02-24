import { Component } from '@angular/core';
import { ImportsPrimengModule } from '../../imports/imports-primeng';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out-button',
  imports: [ImportsPrimengModule],
  template: ` <div
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
          severity="info"
          (onClick)="derectToCartPage()"
          />
      </div>
    </div>
  </div>`,
})
export class CheckOutButtonComponent {
  constructor(
    public orderService: OrderService,
    private readonly router: Router
  ) {}

  derectToCartPage() {
    console.log("object");
    this.router.navigate(['/cart']);
  }
}
