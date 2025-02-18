import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ImportsPrimengModule } from '../../../shared/imports/imports-primeng';

@Component({
  selector: 'app-nav-bar',
  imports: [ImportsPrimengModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  userName: string = 'John Doe';
  userAvatar: string = 'https://picsum.photos/id/237/200/300';
  items: MenuItem[] | undefined;

  constructor(private readonly messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink:'profile'
      },
      {
        label: 'Order History',
        icon: 'pi pi-history',
        routerLink:'history'
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Signed out',
            detail: 'User logged out',
            life: 3000,
          });
        },
      },
    ];
  }

  logout() {
    console.log('Logout clicked');
  }

}
