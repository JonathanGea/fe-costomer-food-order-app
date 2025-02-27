import { Component } from '@angular/core';
import { Imports } from '../../shared/imports/imports';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-order-success',
  imports: [Imports, ImportsPrimengModule],
  template: `
    <div>success</div>

    <p-button (onClick)="back()" label="back"> </p-button>
  `,
})
export class OrderSuccessComponent {
  constructor(public derect: DerectService) {}

  back() {
    this.derect.refreshPage();
    this.derect.toMenuPage();
  }
}
