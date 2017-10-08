import { SendOrderService } from './../../../Services/send-order.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { DeliveryDayService } from './../../../Services/delivery-day.service';
import { CartProductsService } from './../../../Services/cart-products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;
declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewChecked, AfterViewInit {
  deliverDay: any[];
  Products: any[];
  paymentForm: FormGroup;
  ProductIds: any[] = [];
  order: any = {};
  userId: any;
  itemSubTotal: number;
  constructor(
    private deliveryDayService: DeliveryDayService,
    private CartProducts: CartProductsService,
    private fb: FormBuilder,
    private router: Router,
    private sendOrderService: SendOrderService,
    private _flashMessagesService: FlashMessagesService
  ) {
  }

  ngOnInit() {
    this.CartProducts.currentProducts.subscribe(products => this.Products = products);
    this.deliveryDayService.deliverDay.subscribe(d => this.deliverDay = d);
    if (this.deliverDay.length <= 0) {
      this.router.navigate(['/cart/delivery-day']);
    }
    let localU = localStorage.getItem('user');
    this.userId = localU;
    
    //this.createForm();

    //console.log(this.Products);
    this.itemSubTotal = 0;
    this.Products.forEach(element => {
      this.itemSubTotal += element.sel_price * element.qty;
      this.ProductIds.push({
        id: element.id,
        qty: element.qty
      });
    });
    
  }
  ngAfterViewChecked() {
    $(".order-bar ul>li a").each(function () {
      if ($(this).hasClass('active')) {
        $(".order-bar ul>li").removeClass("active");
        $(this).parent('li').addClass('active')
      }
    });
  }
  createForm() {
    this.paymentForm = this.fb.group({
     // paymentOption: ['', Validators.required]
    });
  }
  formSubmit(values) {
    //console.log(this.deliverDay[0]);
    this.order.userId = this.userId;
    //this.order.paymentOption = values.paymentOption;
   //this.order.paypalInfo = values.paypalInfo;
    this.order.totalAmount = this.itemSubTotal;
    this.order.paymentState= values.state;
    this.order.create_time= values.create_time;
    this.order.paymentstatus= values.status;
    this.order.email= values.email;
    this.order.paypalAmount= this.itemSubTotal;
    this.order.deliverDay = this.deliverDay[0];
    this.order.products = this.ProductIds;
    console.log(JSON.stringify(this.order));
    this.sendOrderService.sendOrder(this.order);
  }
  ngAfterViewInit() {
    this.Mypaypal();
  }
  Mypaypal() {
    const self = this;
    paypal.Button.render({

      env: 'sandbox', // sandbox | production
      style: {
        label: 'pay',
        size: 'responsive', // small | medium | large | responsive
        shape: 'rect',   // pill | rect
        color: 'gold'   // gold | blue | silver | black
      },
      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
        //sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        //sandbox:    'W6D5PHZJXBSA4',
        sandbox: 'AVvwyeHnTHvUdXy4uPD8R0sFTrScud4eixD28NaECwZzMCMAfGuBMn01SnC5P9eZMseBEBuc9yJJeleI',
        production: '<insert production client id>'
      },

      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,

      // payment() is called when the button is clicked
      payment: function (data, actions) {

        // Make a call to the REST api to create the payment
        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount: { total:self.itemSubTotal, currency: 'USD' }
              }
            ]
          }
        });
      },

      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function (data, actions) {

        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function (payment) {
          let values =  {
              state: payment.state,
              create_time: payment.create_time,
              status: payment.payer.status,
              email: payment.payer.payer_info.email
          }
          self.formSubmit(values);
          self._flashMessagesService.show('Thnak you for submited order!', { cssClass: 'alert-success', timeout: 2000 });
        });
      },
      onCancel: function (data) {
       alert('The payment was cancelled!');
      }

    }, '#paypal-button');
  }

}
