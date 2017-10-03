import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { DeliveryDayService } from './../Services/delivery-day.service';
import { CartProductsService } from './../Services/cart-products.service';

@Injectable()
export class SendOrderService {

  constructor(private http: Http,
    private router: Router,
    private cartProducts: CartProductsService,
    private deliveryDayService: DeliveryDayService
  ) { }
  private _buildParams(params: any) {
    let urlSearchParams = new URLSearchParams();

    for(let key in params){
        if(params.hasOwnProperty(key)){
            urlSearchParams.append(key, params[key]);
        }
    }
    return urlSearchParams.toString();
}
  sendOrder(order) {
    //let header = new Headers();
    //header.append('Content-Type', 'application/json');
    //console.log(this._buildParams(order));
    let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
    });
    
    this.http.post('http://www.binaryfrog.co/web/api/order_place.php', JSON.stringify(order),  options).map((res: Response) => {
      return res;      
    }).subscribe((data) => {
      console.log("Response: ", data);
      this.cleanUp();
    });
    
    // this.http.post('http://localhost/demo/web_services/order_place.php', JSON.stringify(order),  options).map((res: Response) => {
    //   return res;      
    // }).subscribe((data) => {
    //   console.log("Response: ", data);
    // });

  }
  cleanUp() {
    this.cartProducts.deleteProducts();
    this.deliveryDayService.deleteDays();
    this.router.navigate(['/complete']);
  }
  
}
