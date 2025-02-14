import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { CardModule } from 'primeng/card';
import { ProductComponent } from '../../shared/components/product/product.component';
import { ShopInfoCardComponent } from '../../shared/components/shop-info-card/shop-info-card.component';
import { MenuHeaderComponent } from "./menu-header/menu-header.component";

@Component({
  selector: 'app-menu',
  imports: [CardModule, ProductComponent, ShopInfoCardComponent, MenuHeaderComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  @ViewChild('container', { static: true })
  container!: ElementRef;

  getContainer() {
    return this.container.nativeElement;
  }
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    console.log('this.products :>> ', this.products);
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log('error :>> ', error);
      },
      complete: () => {
        console.log('Product retrieval complete');
      },
    });
  }
}
