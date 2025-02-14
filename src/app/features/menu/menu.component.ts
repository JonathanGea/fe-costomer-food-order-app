import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { ProductComponent } from '../../shared/components/product/product.component';
import { ShopInfoCardComponent } from '../../shared/components/shop-info-card/shop-info-card.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { ImportsModule } from '../../imports-primeng';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";

@Component({
  selector: 'app-menu',
  imports: [
    ImportsModule,
    ProductComponent,
    ShopInfoCardComponent,
    MenuHeaderComponent,
    UserProfileComponent
],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  @Input() container!: ElementRef;  
  isVisible: boolean = false;
  products: Product[] = [];



  ngAfterViewInit() {

  }

  toggleDrawer() {
    this.isVisible = !this.isVisible;
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
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
