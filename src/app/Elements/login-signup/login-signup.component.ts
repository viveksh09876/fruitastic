import { Response } from '@angular/http';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  authUser: any[] = [];
  loginForm: FormGroup;
  signupForm: FormGroup;
  newsLetterForm: FormGroup;
  emailExits: boolean = false;
  constructor(
    private authService: AuthService, private fb: FormBuilder,
    private _flashMessagesService: FlashMessagesService) {
    this.createForms();
  }
  ngOnInit() {
    this.authService.currentAuth.subscribe((u) => this.authUser = u);
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
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.newsLetterForm = this.fb.group({
      email: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      pass: ['', Validators.required],
      cPassword: ['', Validators.required],
      contact: ''
    }, { Validator: this.customVal});
  }
  doLogin(values) {
    // safisafi@gmail.com&pass=123456
    this.authService.doLogin(values).map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      console.log(data);
      if(data) {
        this.authUser.push(data[0]['id']);
        localStorage.setItem('user', data[0]['id']);
        $('#signinModal').modal('hide');
        this._flashMessagesService.show('Your are login successfully!', { cssClass: 'alert-success', timeout: 2000 });
      } else {
        this._flashMessagesService.show('Login Failure!', { cssClass: 'alert-danger', timeout: 2000 });
      }
    });
  }
  signup(values) {
    this.authService.signUp(values).map((res: Response) => {
      return res.json();
    }).subscribe((data) => {
      console.log(data);
      if(data[0]) {
        $('#signupModal').modal('hide');
        localStorage.setItem('user', data[0].id);
        this._flashMessagesService.show('Your are register successfully!', { cssClass: 'alert-success', timeout: 2000 });
      } else {
        this._flashMessagesService.show('Register Failure!', { cssClass: 'alert-danger', timeout: 2000 });
      }
    });
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
