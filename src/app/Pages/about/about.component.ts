import { GetListService } from './../../Services/get-list.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 // pageContent: any;
  constructor(
    private getList: GetListService
  ) { }
  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
    $('.bxslider').bxSlider({
      minSlides: 2,
      maxSlides: 2,
      slideWidth: 550,
      slideMargin: 30,
      auto: true,
      pager: false,
      controls: true
    });
    // this.getContent();
  }
  // getContent() {
  //   this.getList.Getlist('http://www.binaryfrog.co/web/api/get_content.php?pname=about_us').map(d => {
  //     return d.json();
  //   }).subscribe((data) => {
  //     console.log(data);
  //     this.pageContent = data[0]['description'];
  //   })
  // }

}
