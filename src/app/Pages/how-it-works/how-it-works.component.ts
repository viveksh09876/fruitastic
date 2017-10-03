import { GetListService } from './../../Services/get-list.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
declare var $: any;
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  pageContent: any;
  constructor(
    private getList: GetListService
  ) { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
    this.getContent();
  }
  getContent() {
    this.getList.Getlist('http://www.binaryfrog.co/web/api/get_content.php?pname=how_it_works').map(d => {
      return d.json();
    }).subscribe((data) => {
      console.log(data);
      this.pageContent = data[0]['description'];
    })
  }

}
