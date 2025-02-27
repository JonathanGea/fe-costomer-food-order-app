import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { OrderService } from '../../../shared/services/order.service';
import { Imports } from '../../../shared/imports/imports';
import { ImportsPrimengModule } from '../../../shared/imports/imports-primeng';

@Component({
  selector: 'app-cart-product',
  imports: [Imports, ImportsPrimengModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent {
  @Input() product!: Product;
  @Output() updateProductOrder = new EventEmitter<void>();

  constructor(public orderService: OrderService) {}

  incrementQuantity(product: Product) {
    this.orderService.incrementQuantity(product);
  }

  decrementQuantity(product: Product) {
    this.orderService.decrementQuantity(product);
    if (product.quantity == 0) {
      this.updateProductOrder.emit();
    }
  }
}
