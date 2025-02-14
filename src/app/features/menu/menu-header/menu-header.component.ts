import { Component, HostListener, Input } from '@angular/core';
import { ImportsModule } from '../../../imports-primeng';

@Component({
  selector: 'app-menu-header',
  imports: [ImportsModule],
  template: `
    <style>
      .card {
        background-color: white;
        padding: 12px;
        border: 0.5px solid #fefefe;
        font-size: 16px;
        font-weight: 700;
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
      <span>Toko Makanan Weannak Banget</span>
      <div>
        <p-button
          icon="pi pi-bars"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          (click)="isVisible = true"
        />
      </div>
    </div>
  `,
})
export class MenuHeaderComponent {
  @Input() container: any;

  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    console.log('windows scroll');
  }
}
