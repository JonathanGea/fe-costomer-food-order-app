import { Component, HostListener, Input, output } from '@angular/core';
import { ImportsPrimengModule } from '../../imports/imports-primeng';

@Component({
  selector: 'app-shop-info-card',
  imports: [ImportsPrimengModule],
  template: `
    <p-card header="Toko Makanan Weannak Banget">
      <p class="m-0">close order in 10:30</p>
    </p-card>
  `,
})
export class ShopInfoCardComponent {}
