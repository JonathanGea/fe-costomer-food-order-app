import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinner, CommonModule],
  template: `
    <div *ngIf="isLoading" class="overlay-spinner">
      <p-progressSpinner></p-progressSpinner>
    </div>
  `,
  styles: [
    `
      .overlay-spinner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class LoadingComponent {
  @Input()
  isLoading!: boolean;
}
