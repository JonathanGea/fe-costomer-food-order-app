import { Component } from '@angular/core';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [ImportsPrimengModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  constructor( private readonly router: Router){
    
  }

  derectToMenuPage() {
    this.router.navigate(['/']);
  }

}
