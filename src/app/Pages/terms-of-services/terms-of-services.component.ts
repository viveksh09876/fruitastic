import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-terms-of-services',
  templateUrl: './terms-of-services.component.html',
  styleUrls: ['./terms-of-services.component.css']
})
export class TermsOfServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
