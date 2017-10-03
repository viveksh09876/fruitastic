import { Component, OnInit } from '@angular/core';
import { GetListService } from './../../Services/get-list.service';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  postMatch: boolean = false;
  postCode: any;
  constructor(private getListService: GetListService) { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }
  checkPostcode() {
    var inval = $("#pin_code").val();
    if(inval != '') {
      $('#check_now').modal('show');
      this.postCode = inval;
      this.getListService.Getlist('http://www.binaryfrog.co/web/api/chk_pincode.php?zcode='+inval)
      .map((res: Response) => {
        return res.json();
      }).subscribe((data) => {
        console.log(data);
        if(data) {
          this.postMatch = true;
          localStorage.setItem('loc', data.code + ' - ' + data.location);
        }
      });
    } else {
      alert('Please input your postcode.');
    }
  }
}
