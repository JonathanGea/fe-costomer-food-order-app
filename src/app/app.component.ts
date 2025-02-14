import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ImportsModule } from './imports-primeng';
import { MenuComponent } from './features/menu/menu.component';
import { MenuSidebarComponent } from "./features/menu/menu-sidebar/menu-sidebar.component";

@Component({
  selector: 'app-root',
  imports: [ImportsModule, MenuComponent, MenuSidebarComponent],
  templateUrl: './app.component.html',
  styleUrls:  ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  isVisible: boolean = true;

  ngAfterViewInit() {
  }
}
