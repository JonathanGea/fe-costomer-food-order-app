import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  private readonly containerSubject = new BehaviorSubject<ElementRef | null>(null);
  container$ = this.containerSubject.asObservable();

  setContainer(container: ElementRef) {
    this.containerSubject.next(container);
  }
  
}