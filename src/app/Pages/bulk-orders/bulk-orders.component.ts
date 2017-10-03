import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-bulk-orders',
  templateUrl: './bulk-orders.component.html',
  styleUrls: ['./bulk-orders.component.css']
})
export class BulkOrdersComponent implements OnInit {
  bulkOrderForm: FormGroup;
  constructor() { }

  ngOnInit() {
    $('body').stop().animate({scrollTop:0}, 100);
  }

}
