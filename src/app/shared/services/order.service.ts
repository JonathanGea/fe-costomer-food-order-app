import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../../core/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    private apiUrl = environment.apiUrl + '/order';
  
    constructor(private http: HttpClient) {}
  
    getOrderHistoy(): Observable<Order[]> {
      return this.http
        .get<{
          isSuccess: boolean;
          data: Order[];
          timestamp: string;
          errors: any;
        }>(this.apiUrl)
        .pipe(
          map((response) => {
            console.log('Response received: ', response); 
            return response.data; 
          })
        );
    }
  
    
}
