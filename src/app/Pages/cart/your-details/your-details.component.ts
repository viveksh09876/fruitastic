import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { GetListService } from '../../../Services/get-list.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-your-details',
  templateUrl: './your-details.component.html',
  styleUrls: ['./your-details.component.css']
})
export class YourDetailsComponent implements OnInit, AfterViewChecked {
  userInfo: any;
  userAddress: any;
  userId: any;
  sameAsAdd: boolean = true;
  infoForm: FormGroup;
  constructor(private getListService: GetListService,
    private router: Router,
  private fb: FormBuilder) { }
  ngOnInit() {
    let localU = localStorage.getItem('user');
    if(localU) {
      this.userId = localU;
      this.GetUserInfo();
      this.GetUserAddress();
      this.createform();
      const addEnput = document.getElementById('address');
      var options = {
        componentRestrictions: {country: "au"}
       };
       const addAuto = new google.maps.places.Autocomplete(addEnput, options);
       addAuto.addListener('place_changed', () => {
         this.infoForm['controls']['address'].setValue(addAuto.getPlace().formatted_address);
         this.infoForm['controls']['delv_address'].setValue(addAuto.getPlace().formatted_address);
       });
    } else {
      localStorage.removeItem('user');
      this.router.navigate(['/cart']);
    }
  }
  ngAfterViewChecked() {
    $(".order-bar ul>li a").each(function() {
      if($(this).hasClass('active')) {
        $(".order-bar ul>li").removeClass("active");
        $(this).parent('li').addClass('active')
      }
    });
  }
  GetUserInfo() {
    this.getListService.Getlist('http://www.binaryfrog.co/web/api/user_info.php?id='+this.userId)
    .map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      this.userInfo = data[0];
     console.log('userInfo: ', this.userInfo);
      this.infoForm['controls']['name'].setValue(this.userInfo.name);
      this.infoForm['controls']['lastName'].setValue(this.userInfo.lastName);
      this.infoForm['controls']['contact_no'].setValue(this.userInfo.primary_contact_name);
      this.infoForm['controls']['email'].setValue(this.userInfo.email);
      if(this.userInfo) {
      }
    });
  }
  GetUserAddress() {
    this.getListService.Getlist('http://www.binaryfrog.co/web/api/user_address.php?id='+this.userId)
    .map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      console.log('userAddress: ', data[0]);
      if(data[0]) {
        this.userAddress = data[0];
        this.infoForm['controls']['apartment'].setValue(this.userAddress.apartment);
        this.infoForm['controls']['address'].setValue(this.userAddress.billing_address);
        this.infoForm['controls']['delv_address'].setValue(this.userAddress.delivery_address_street_address);
        this.infoForm['controls']['delv_address_apartment'].setValue(this.userAddress.del_apartment);
      }
    });
  }
  createform() {
    this.infoForm = this.fb.group({
      uId: this.userId,
      name: '',
      lastName: '',
      contact_no: '',
      email: '',
      address: '',
      apartment: '',
      delv_address: '',
      delv_address_apartment: ''
    });
  }
  formSubmit(value) {
    console.log(value);
    this.getListService.Postlist('http://www.binaryfrog.co/web/api/upate_info.php', value)
    .map((res: Response) => {
      // return res.json();
      console.log(res);
    }).subscribe((d) => {
      // console.log('upate info: ', d);
      // this.router.navigate(['/cart/delivery-day']);
    });
    this.router.navigate(['/cart/delivery-day']);
  }
  sameAddTrue() {
    this.sameAsAdd = true;
  }
  sameAddFalse() {
    this.sameAsAdd = false;
    const self = this;
    var options = {
      componentRestrictions: {country: "au"}
     };
    setTimeout(function(){
      var sameAddEnput = $(document).find('#same_address')[0];
      const addAuto = new google.maps.places.Autocomplete(sameAddEnput, options);
      addAuto.addListener('place_changed', () => {
        self.infoForm['controls']['delv_address'].setValue(addAuto.getPlace().formatted_address);
      });
    },500);
  }
}
