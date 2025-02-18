import { Component } from '@angular/core';
import { ImportsPrimengModule } from '../../imports/imports-primeng';

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
    width: 75%;
  "
  >
    <div
      class="card w-100 d-flex justify-content-between p-2"
      style="align-items: center"
    >
      <div>
        <div class="fs-8">Total Price</div>
        <div class="fw-bold fs-7">Rp1.221.000</div>
      </div>
      <div>
        <p-button
          badge="2"
          label="Check Out"
          size="small"
          icon="pi pi-shopping-cart"
          severity="info"
        />
      </div>
    </div>
  </div>`,
})
export class CheckOutButtonComponent {}
