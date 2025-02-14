import { Component, HostListener, Input, output } from '@angular/core';
import { ImportsModule } from '../../../imports-primeng';

@Component({
  selector: 'app-shop-info-card',
  imports: [ImportsModule],
  template: `
    <p-card header="Toko Makanan Weannak Banget">
      <p class="m-0">close order in 10:30</p>
    </p-card>
  `,
})
export class ShopInfoCardComponent {}
