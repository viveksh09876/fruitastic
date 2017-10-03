import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
