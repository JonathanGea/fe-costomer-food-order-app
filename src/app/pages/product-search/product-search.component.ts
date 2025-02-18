import { Component, OnInit } from '@angular/core';
import { ImportsPrimengModule } from '../../shared/imports/imports-primeng';
import { ProductComponent } from '../../shared/components/product/product.component';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../core/models/product.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Router } from '@angular/router';
import { CheckOutButtonComponent } from '../../shared/components/check-out-button/check-out-button.component';

@Component({
  selector: 'app-product-search',
  imports: [ImportsPrimengModule, ProductComponent, LoadingComponent, CheckOutButtonComponent],
  template: `
    <style>
      .card {
        background-color: white;
        padding: 12px;
        border: 0.5px solid #fefefe;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        box-sizing: border-box;
      }

      .card--sticky {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        z-index: 100;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .search-container {
        display: flex;
        flex: 10;
        margin-right: 8px;
      }

      .search-container input {
        width: 100%;
        box-sizing: border-box;
      }

      .button-container {
        flex: 2;
      }
    </style>
    <app-loading [isLoading]="isLoading"></app-loading>
    <div class="card card--sticky">
      <div class="search-container">
        <p-iconfield class="w-100">
          <p-inputicon styleClass="pi pi-search" />
          <input
            type="text"
            fluid="true"
            pInputText
            placeholder="Search"
            (input)="onSearch($event)"
          />
        </p-iconfield>
      </div>
      <div class="button-container">
        <p-button
          label="Cancel"
          variant="outlined"
          severity="danger"
          (click)="clearSearch()"
        />
      </div>
    </div>

    <div class="mt-6">
      <ng-container
        *ngFor="let product of filteredProducts; trackBy: trackByProductId"
      >
        <app-product [product]="product"></app-product>
      </ng-container>
    </div>
    <app-check-out-button></app-check-out-button>
  `,
})
export class ProductSearchComponent implements OnInit {
  isLoading: boolean = true;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: (error) => {
        console.log('error get products:>> ', error);
      },
      complete: () => {
        console.log('Product retrieval complete');
        this.isLoading = false;
      },
    });
  }

  derectToMenuPage() {
    this.router.navigate(['/']);
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  clearSearch() {
    this.filteredProducts = this.products;
    this.derectToMenuPage();
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}
