import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ImportsPrimengModule } from '../../imports/imports-primeng';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-product',
  imports: [ImportsPrimengModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(
    public orderService : OrderService    
  ) {}

  showQuantityControls : boolean = false

  decrementQuantity(){
    console.log("decrementQuantity");
  }
}
