import { Component, ElementRef, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { ProductComponent } from '../../shared/components/product/product.component';
import { ShopInfoCardComponent } from '../../shared/components/shop-info-card/shop-info-card.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { ContainerService } from '../../shared/services/container.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CheckOutButtonComponent } from "../../shared/components/check-out-button/check-out-button.component";
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-menu',
  imports: [
    ImportsPrimengModule,
    ProductComponent,
    ShopInfoCardComponent,
    MenuHeaderComponent,
    NavBarComponent,
    LoadingComponent,
    CheckOutButtonComponent
],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  isVisible: boolean = false;
  products: Product[] = [];

  container: ElementRef | null = null;

  isloading:boolean = true;

  constructor(
    private readonly containerService: ContainerService,
    private readonly productService: ProductService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.containerService.container$.subscribe((container) => {
      this.container = container;
    });
    this.getProducts();
  }


  toggleDrawer() {
    this.isVisible = !this.isVisible;
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log('error get products:>> ', error);
      },
      complete: () => {
        console.log('Product retrieval complete');
        this.isloading=false;
      },
    });
  }



}
