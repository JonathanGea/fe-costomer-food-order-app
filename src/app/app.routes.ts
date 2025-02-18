import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'history', component: OrderHistoryComponent },
  { path: 'order', component: OrderComponent },
  {
    path: 'tedt',
    component: MenuComponent,
    children: [
      { path: 'product', component: MenuComponent }, 
      { path: '', redirectTo: 'product', pathMatch: 'full' }, 
    ],
  },
];
