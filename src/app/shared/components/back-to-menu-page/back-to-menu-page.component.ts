import { Component } from '@angular/core';
import { Imports } from '../../imports/imports';
import { ImportsPrimengModule } from '../../imports/imports-primeng';
import { OrderService } from '../../services/order.service';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-back-to-menu-page',
  imports: [Imports, ImportsPrimengModule],
  template: `
    <div
      style="
    position: fixed;
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    max-width: 400px;
    width: 95%;
    length: 0px;
    cursor: pointer; 
  "
      (click)="onClick()"
    >
      <div class="w-100 d-flex justify-content-center p-2 align-items-center">
        <div style="width: 100%;">
          <p-button
            variant="outlined"
            severity="info"
            size="large"
            fluid="true"
          >
            Back to menu
          </p-button>
        </div>
      </div>
    </div>
  `,
})
export class BackToMenuPageComponent {
  constructor(
    public orderService: OrderService,
    public derect: DerectService
  ) {}

  onClick() {
    this.derect.toMenuPage();
  }
}
