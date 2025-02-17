import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../../imports-primeng';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-menu-sidebar',
  imports: [ImportsModule],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.css',
})
export class MenuSidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  

  ngOnInit() {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {},
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => {},
      },
    ];
  }
}
