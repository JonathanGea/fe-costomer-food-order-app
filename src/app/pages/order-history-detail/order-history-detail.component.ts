import { Component } from '@angular/core';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { DerectService } from '../../shared/services/derect.service';
import { BackToMenuPageComponent } from "../../shared/components/back-to-menu-page/back-to-menu-page.component";

@Component({
  selector: 'app-order-history-detail',
  imports: [ImportsPrimengModule, BackToMenuPageComponent],
  templateUrl: './order-history-detail.component.html',
})
export class OrderHistoryDetailComponent {

  constructor(
    public derect : DerectService
  ){
    
  }

}
