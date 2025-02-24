import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../shared/services/order.service';
import { Product } from '../../core/models/product.model';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartProductComponent, ImportsPrimengModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    public orderservice: OrderService,
    public derect: DerectService
  ) {}

  productOrder: Product[] = [];

  ngOnInit(): void {
    this.updateProductOrder();
  }

  updateProductOrder(): void {
    this.productOrder = this.orderservice.getProductOrder();
  }
}
