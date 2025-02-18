import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [ToastModule],
  template: `
    <p-toast [breakpoints]="{ '920px': { width: '90%' } }"></p-toast>
  `,
  styleUrl: './toast.component.css',
})
export class ToastComponent {}
