import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-legel-notice',
  templateUrl: './legel-notice.component.html',
  styleUrls: ['./legel-notice.component.css']
})
export class LegelNoticeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
