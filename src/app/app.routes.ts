import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { UserProfileComponent } from './features/menu/user-profile/user-profile.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: UserProfileComponent },
  {
    path: 'tedt',
    component: MenuComponent,
    children: [
      { path: 'product', component: MenuComponent }, 
      { path: '', redirectTo: 'product', pathMatch: 'full' }, 
    ],
  },
];
