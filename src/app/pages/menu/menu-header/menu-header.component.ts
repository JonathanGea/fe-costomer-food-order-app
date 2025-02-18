import { Component, HostListener, EventEmitter, Output } from '@angular/core';
import { ImportsPrimengModule } from '../../../shared/imports/imports-primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  imports: [ImportsPrimengModule],
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
    </style>
    <div class="card card--sticky">
      <div><span class="fw-bold">Delivered to : </span> <br /></div>

      <div>
        <p-button
          icon="pi pi-search"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          (click)="derectToSearchPage()"
        />
        <p-button
          icon="pi pi-bars"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          (click)="onToggleDrawer()"
        />
      </div>
    </div>
  `,
})
export class MenuHeaderComponent {
  @Output() toggleDrawer = new EventEmitter<void>();


  constructor(
     private readonly router: Router
  ){

  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  derectToSearchPage() {
    this.router.navigate(['/search']);
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    console.log('windows scroll');
  }
}
