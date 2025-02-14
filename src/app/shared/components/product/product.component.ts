import { Component, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ImportsModule } from '../../../imports';
@Component({
  selector: 'app-product',
  imports: [ImportsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: Product | undefined;
}
