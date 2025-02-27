import { Component } from '@angular/core';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-order-history-detail',
  imports: [ImportsPrimengModule],
  templateUrl: './order-history-detail.component.html',
  styleUrl: './order-history-detail.component.css'
})
export class OrderHistoryDetailComponent {

  constructor(
    public derect : DerectService
  ){
    
  }

}
