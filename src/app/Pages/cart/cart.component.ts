import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, DoCheck } from '@angular/core';
import { CartProductsService } from './../../Services/cart-products.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck {
  Products: any;  
  itemSubTotal: number = 0;
  cupanVForm: FormGroup;
  loc: any;
  constructor(private CartProducts: CartProductsService,
  private fb: FormBuilder) { }

  ngOnInit() {
    this.CartProducts.currentProducts.subscribe(products => this.Products = products);
    $('body').stop().animate({scrollTop:0}, 100);
    this.Products.map((p) => {
      this.itemSubTotal += p.sel_price * p.qty;
    });
    this.loc = localStorage.getItem('loc');
    this.cupanVForm = this.fb.group({
      code: ''
    })
  }
  ngDoCheck() {
    this.itemSubTotal = 0;
    this.Products.map((p) => {
      this.itemSubTotal += p.sel_price * p.qty;
    });
  }
  cartProductRemove(ind) {
    this.Products.splice(ind, 1);
  }

}
