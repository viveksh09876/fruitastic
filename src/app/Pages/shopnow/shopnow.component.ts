import { FormGroup, FormBuilder } from '@angular/forms';
import { GetListService } from './../../Services/get-list.service';
import { CartProductsService } from './../../Services/cart-products.service';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-shopnow',
  templateUrl: './shopnow.component.html',
  styleUrls: ['./shopnow.component.css']
})
export class ShopnowComponent implements OnInit, DoCheck, OnDestroy {
  Categories: any;
  Products: any[] = [];
  activeCat: number;
  activeCatInd: number;
  catLoading: boolean = true;
  proLoading: boolean = true;
  cartProduct = [];
  itemSubTotal: number;
  voucherCodeForm: FormGroup;
  loc: any;
  noMore: boolean = false;
  cPage: number = 1;
  constructor(
    private getListService: GetListService,
    private CartProducts: CartProductsService,
  private _fb: FormBuilder) { }
  domain = environment.ApiPath;

  ngOnInit() {
    this.voucherCodeForm = this._fb.group({
      code: ''
    });
    this.GetCategory();
    var self = this;
    this.CartProducts.currentProducts.subscribe(products => this.cartProduct = products);
    $('footer').hide();
    $('body').stop().animate({scrollTop:0}, 100);
    //this.GetCategory();
    this.loc = localStorage.getItem('loc');
    $(window).on('scroll', function() {
      var scrolT = $(window).scrollTop();
      var wiH = $('body').outerHeight();

      var bannerH = $(".banner_container.cart-banner").height();
      var headH = $("header.header").height();
      var margH = bannerH + headH;
      if(scrolT > margH) {
        $(".pnl-group-fix").addClass("affix");
      } else {
        $(".pnl-group-fix").removeClass("affix");
      }
      if(scrolT > wiH) {
       // self.onScrollLoad();
      }
    });
  }
  ngDoCheck() {
    this.AddAmounts();
  }
  GetCategory() {
    this.getListService.Getlist(this.domain+'get_cat.php').map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      this.Categories = data;
      if(this.Categories) {
        this.catLoading = false;
        this.GetProduct(2, 1);
        this.activeCat = this.Categories[0]['id'];
      }
    });
  }
  GetProduct(catId, page: number) {
    this.proLoading = true;
    this.getListService.Getlist('http://www.binaryfrog.co/web/api/get_product_byid.php?cid='+ catId + '&p=' + page).map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      data.map((dataP) => {
        if(this.cartProduct.length > 0) {
          for(let i = 0; i <  this.cartProduct.length; i++) {
            if(dataP['id'] == this.cartProduct[i]['id']) {
              dataP.qty = this.cartProduct[i]['qty'];
              dataP.qty = this.cartProduct[i]['qty'];
              dataP.action = 'added';
              break;
            } else {
              dataP.qty = 1;
              dataP.action = 'add';
            }
          }
        } else {
          dataP.qty = 1;
          dataP.action = 'add';
        }
      });
      this.PushProductList(data, page);
      //this.cartProduct = JSON.parse(localStorage.getItem('cartProduct'));
      // if(page > 1) {
      //   //this.Products.push(data);
      //   console.log(typeof(this.Products));
      // } else {
      //   this.Products = data;
      // }
      // this.proLoading = false;
    });
  }
  PushProductList(data, page) {
    if(data.length > 0) {
      if(page > 1) {
        // console.log(page);
        for(var i = 0; i < data.length; i++) {
          this.Products.push(data[i]);
        }
      } else {
        this.Products.length = 0;
        for(var i = 0; i < data.length; i++) {
          this.Products.push(data[i]);
        }
      }
      this.cPage += 1;
      this.proLoading = false;
    } else {
      this.cPage = 1;
      this.activeCatInd += 1;
    }
    // console.log(this.Products.length);
  }
  onScrollLoad() {
    if(this.activeCatInd <= 5) {
      let cId = this.Categories[this.activeCatInd]['id'];
      //this.GetProduct(cId, this.cPage);
      const self = this;
      setTimeout(function() {
        self.GetProduct(2, 2);
      });
    }
  }
  ProFilter(catId, ind) {
    this.GetProduct(catId, 1);
    //this.activeCat = catId;
    this.activeCatInd = ind;
    var self = this;
    // setTimeout(function() {
    //   self.GetProduct(catId, 2);
    // },1000);
    return false;
  }
  AddAmounts() {
    this.itemSubTotal = 0;
    this.cartProduct.map((p) => {
      this.itemSubTotal += p.sel_price * p.qty;
    });
  }
  PushProduct(pro) {
    this.cartProduct.push(pro);
    // localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
  }
  ProductAdd(pro, event) {
    const btn = event.target || event.srcElement || event.currentTarget;
    const btnVal = $(btn).closest('tr').find('.quantity').val();
    const qty = parseInt(btnVal);
    pro.action = 'added';
    if(this.cartProduct.length > 0) {
      let chekMatch = false;
      this.cartProduct.map((cP) => {
        if(cP.id == pro.id) {
          chekMatch = true;
          //cP.qty = pro.qty;
          cP.qty = qty;
        }
      });
      if(!chekMatch) {
        this.PushProduct(pro);
      }
    } else {
      this.PushProduct(pro);
    }
    // console.log(qty);
    // localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
   // this.actionAdded(btn);
    // console.log(this.cartProduct);
  }
  cartProductRemove(ind) {
    this.Products.forEach(element => {
      if(element['id'] == this.cartProduct[ind]['id']) {
        element['action'] = 'add';
      }
    });
    this.cartProduct.splice(ind, 1);
    // localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
  }
  // actionAdded(btn) {
  //   const ancher = $(btn).closest('td.action').children("a");
  //   $(ancher).html('<p><i class="fa fa-check-circle fa-3x"></i></p> <span>Added</span>');
  //   $(ancher).attr('data-action','added');
  // }
  addQty(pro, ev) {
    var inpu = $(ev.target).closest('.cart-quantity').find('input.quantity-text');
    var val = parseInt($(inpu).val());
    $(inpu).val(val+1);
    //pro.qty += 1;
    if(pro.action == 'added') {
      pro.action = 'update';
    }
    return true;
  }
  minusQty(pro, ev) {
    var inpu = $(ev.target).closest('.cart-quantity').find('input.quantity-text');
    var val = parseInt($(inpu).val());
    if(val > 1) {
      //pro.qty -= 1;
      $(inpu).val(val-1);
      if(pro.action == 'added') {
        pro.action = 'update';
      }
    }
    return true;
  }
  ngOnDestroy() {
    $('footer').show();
    // $('body').removeAttr('data-spy');
    // $('body').removeAttr('data-target');
    // $('body').removeAttr('data-offset');
    //$(window).off('scroll');
  }

}
