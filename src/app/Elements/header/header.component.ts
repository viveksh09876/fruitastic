import { CartProductsService } from './../../Services/cart-products.service';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  authUser: any[] = [];
  products: any;
  itemSubTotal: number;
  constructor(private cartProducts: CartProductsService, private auth: AuthService,
  private router: Router) { }
  ngOnInit() {
    this.cartProducts.currentProducts.subscribe( products => this.products = products);
    this.auth.currentAuth.subscribe( u => this.authUser = u);
    let storageUser = localStorage.getItem('user');
    if (storageUser != null && storageUser != '') {
      this.authUser[0] = storageUser;
    }
  }
  ngDoCheck() {
    this.itemSubTotal = 0;
    this.products.map((p) => {
      this.itemSubTotal += p.sel_price * p.qty;
    });
    let storageUser = localStorage.getItem('user');
    if (storageUser != null && storageUser != '') {
      this.authUser[0] = storageUser;
    }
  }
  signout() {
    this.authUser.length = 0;
    this.auth.signout();
    this.router.navigate(['/']);
  }


}
