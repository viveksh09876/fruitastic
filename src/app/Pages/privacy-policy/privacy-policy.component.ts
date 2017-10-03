import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
