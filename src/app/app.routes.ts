import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CartComponent } from './pages/cart/cart.component';

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
