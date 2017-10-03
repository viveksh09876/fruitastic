import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-terms-of-sale',
  templateUrl: './terms-of-sale.component.html',
  styleUrls: ['./terms-of-sale.component.css']
})
export class TermsOfSaleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
