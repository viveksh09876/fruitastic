import { Response } from '@angular/http';
import { GetListService } from './../../Services/get-list.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  address: any;
  uId: any;
  constructor(private GetData: GetListService, private router: Router) { }

  ngOnInit() {
    let uid = localStorage.getItem('user');
    if(uid != null && uid != '') {
      this.uId = uid;
      this.getDetails();
    } else {
      this.router.navigate(['/']);
    }
  }
  getDetails() {
    this.GetData.Getlist('http://www.binaryfrog.co/web/api/user_info.php?id='+this.uId).map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      this.user = data[0];
      console.log(data);
    });
    this.GetData.Getlist('http://www.binaryfrog.co/web/api/user_address.php?id='+this.uId)
    .map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      this.address = data[0];
      console.log(this.address);
    });
  }

}
