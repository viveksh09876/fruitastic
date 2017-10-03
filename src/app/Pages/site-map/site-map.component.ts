import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
