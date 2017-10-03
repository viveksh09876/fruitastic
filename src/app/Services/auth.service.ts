import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private authSource = new BehaviorSubject<any>([]);
  currentAuth = this.authSource.asObservable();
  constructor(private http: Http) {  }
  getUser(url) {
    let header = new Headers({'Access-Control-Allow-Origin': '*', "Accept": "application/json"});
    return this.http.get(url, {headers: header});
  }
  doLogin(u) {
    return this.http.get('http://www.binaryfrog.co/web/api/check_login.php?email=' + u.email + '&pass=' + u.password);
  }
  signUp(u) {
    return this.http.get('http://www.binaryfrog.co/web/api/register_user.php?name='+u.name+'&email='+u.email+'&pass='+u.password+'&contact_no=' + u.contact);
  }
  checkuser(email) {
    return this.http.get('http://www.binaryfrog.co/web/api/check_user.php?email='+email);
  }
  signout() {
    localStorage.removeItem('user');
  }


}
