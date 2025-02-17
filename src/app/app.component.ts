import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  MenuComponent } from './pages/menu/menu.component';
import { ContainerService } from './shared/services/container.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  styles: [
    `
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
    `,
  ],
  template: `
    <div class="container" #container>
      <router-outlet />
      <!-- <app-menu [container]="containerElement"></app-menu> -->
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;

  constructor(private containerService: ContainerService) {}

  ngAfterViewInit() {
    this.containerService.setContainer(this.container);
  }
}
