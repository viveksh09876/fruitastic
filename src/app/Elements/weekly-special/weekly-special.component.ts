import { Component, OnInit } from '@angular/core';
import { GetListService } from './../../Services/get-list.service';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-weekly-special',
  templateUrl: './weekly-special.component.html',
  styleUrls: ['./weekly-special.component.css']
})
export class WeeklySpecialComponent implements OnInit {
  data: any;
  constructor(private getListService: GetListService) { }

  ngOnInit() {
    this.getListService.Getlist('http://www.binaryfrog.co/web/api/get_weekly_special.php').map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      this.data = data;
      console.log(this.data);
    })
  }

}
