import { Component, OnInit } from '@angular/core';
import { ImportsPrimengModule } from '../../../shared/imports/imports-primeng';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-menu-sidebar',
  imports: [ImportsPrimengModule],
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
