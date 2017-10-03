import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartProductsService {
  private productSource = new BehaviorSubject<any>([]);
  currentProducts = this.productSource.asObservable();
  private pro: any[];
  constructor() { }
  changeProducts(products: any) {
    this.productSource.next(products);
  }
  deleteProducts() {
    this.currentProducts.subscribe(p => this.pro = p);
    this.pro.length = 0;
  }

}
