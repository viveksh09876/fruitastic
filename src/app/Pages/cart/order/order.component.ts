import { GetListService } from './../../../Services/get-list.service';
import { Response } from '@angular/http';
import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewChecked {
  orderLoginform: FormGroup;
  signupForm: FormGroup;
  authUser: any[] = [];
  sameAsAdd: boolean = true;
  emailExits: boolean = false;
  constructor(private authService: AuthService,
    private fb: FormBuilder, private router: Router,
    private _flashMessagesService: FlashMessagesService,
  private getListService: GetListService) {
    let localUser = localStorage.getItem('user');
    if(localUser != null) {
      this.router.navigate(['/cart/your-details']);
    }
    this.createForms();
  }
  ngOnInit() {
    const addEnput = document.getElementById('address');
    var options = {
      componentRestrictions: {country: "au"}
     };
     const addAuto = new google.maps.places.Autocomplete(addEnput, options);
     addAuto.addListener('place_changed', () => {
       this.signupForm['controls']['address'].setValue(addAuto.getPlace().formatted_address);
       this.signupForm['controls']['delv_address'].setValue(addAuto.getPlace().formatted_address);
     });
  }
  ngAfterViewChecked() {
    $(".order-bar ul>li a").each(function() {
      if($(this).hasClass('active')) {
        $(".order-bar ul>li").removeClass("active");
        $(this).parent('li').addClass('active')
      }
    });
  }
  customVal(Ac: AbstractControl) {
    var pass = Ac.get('pass').value;
    var passC = Ac.get('cPassword').value;
    if (pass !== passC) {
        Ac.get('cPassword').setErrors({ MatchPassword: true });
    }
    else {
        return null;
    }
  }
  createForms() {
    this.orderLoginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      delv_address: [''],
      apartment: [''],
      delv_address_apartment: [''],
      contact_no: '',
      pass: ['', Validators.required],
      cPassword: ['', Validators.required]
    }, { validator: this.customVal});
  }
  doLogin(values) {
    // safisafi@gmail.com&pass=123456
    this.authService.doLogin(values).map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      if(data) {
        this.authUser[0] = data[0]['id'];
        localStorage.setItem('user', data[0]['id']);
        this.router.navigate(['/cart/your-details']);
        this._flashMessagesService.show('Your are login successfully continue with your cart!', { cssClass: 'alert-success', timeout: 2000 });
      } else if(data == 0) {
        this._flashMessagesService.show('Your paswword not match Failure!', { cssClass: 'alert-danger', timeout: 2000 });
      } else {
        this._flashMessagesService.show('Login Failure!', { cssClass: 'alert-danger', timeout: 2000 });
      }
    });
  }
  signup(values) {
    console.log(values);
    this.getListService.Postlist('http://www.binaryfrog.co/web/api/register_user.php', values)
    .map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      console.log(data);
      if(data[0]) {
        localStorage.setItem('user', data[0].id);
        this._flashMessagesService.show('Your are register successfully!', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/cart/your-details']);
      } else {
        this._flashMessagesService.show('Register Failure!', { cssClass: 'alert-danger', timeout: 2000 });
      }
    });

    // this.authService.signUp(values).map((res: Response) => {
    //   return res.json();
    // }).subscribe((data) => {
    //   console.log(data);
    //   if(data[0]) {
    //     localStorage.setItem('user', data[0].id);
    //     this._flashMessagesService.show('Your are register successfully!', { cssClass: 'alert-success', timeout: 2000 });
    //     this.router.navigate(['/cart/your-details']);
    //   } else {
    //     this._flashMessagesService.show('Register Failure!', { cssClass: 'alert-danger', timeout: 2000 });
    //   }
    // });
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
        self.signupForm['controls']['delv_address'].setValue(addAuto.getPlace().formatted_address);
      });
    },500);
  }
  onblurMethod(evt) {
    this.authService.checkuser(evt.target.value).map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      if(data == 1) {
        this.emailExits = true;
        this._flashMessagesService.show('Please use diffrent email!', { cssClass: 'alert-danger', timeout: 2000 });
      } else {
        this.emailExits = false;
      }
    })
  }
}
