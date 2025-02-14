import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<{
        isSuccess: boolean;
        data: Product[];
        timestamp: string;
        errors: any;
      }>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
