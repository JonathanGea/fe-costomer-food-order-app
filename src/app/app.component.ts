import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ImportsModule } from './imports-primeng';
import { MenuComponent } from './features/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [ImportsModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrls:  ['./app.component.css'],
  standalone: true, 
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef;

  ngAfterViewInit() {
  }

  get containerElement(): ElementRef {
    return this.container;
  }



}
