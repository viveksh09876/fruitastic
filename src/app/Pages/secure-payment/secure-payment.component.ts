import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-secure-payment',
  templateUrl: './secure-payment.component.html',
  styleUrls: ['./secure-payment.component.css']
})
export class SecurePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
