import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImportsModule } from './imports-primeng';
import { MenuComponent } from './features/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [ImportsModule, MenuComponent],
  styles: [`
    .container {
      padding: 12px;
      max-width: 500px;
      min-height: 100%;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid #eee;
      background-color: #fafafa;
      position: relative;
    }
  `],
  template: `
    <div class="container" #container>
      <app-menu [container]="containerElement"></app-menu>
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  @ViewChild('container', { static: true }) container!: ElementRef;

  get containerElement(): ElementRef {
    return this.container;
  }
}