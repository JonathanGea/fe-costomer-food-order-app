import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DerectService {
  constructor(private readonly router: Router) {}

  toSearchPage() {
    this.router.navigate(['/search']);
  }

  toMenuPage() {
    console.log('to menu page');
    this.router.navigate(['/']);
  }

  toOrderSuccesPage() {
    console.log('to menu page');
    this.router.navigate(['/order/succes']);
  }

  refreshPage() {
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }

  historyOrderPage() {
    this.router.navigate(['/history']);
  }

  historyDetailPage(id: string) {
    console.log('id :>> ', id);
    this.router.navigate([`/history/${id}`]);
  }

  toOrderDetailPage(id: string) {
    this.router.navigate([`/order/${id}`]);
  }
  
}
