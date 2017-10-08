import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private authSource = new BehaviorSubject<any>([]);
  currentAuth = this.authSource.asObservable();
  constructor(private http: Http) {  }
  domain = environment.ApiPath;

  getUser(url) {
    let header = new Headers({'Access-Control-Allow-Origin': '*', "Accept": "application/json"});
    return this.http.get(url, {headers: header});
  }
  
  doLogin(data) : Observable<any>{
    return this.http.post( this.domain + 'check_login.php', data)
    .map((res: Response) => res.json())
    .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  forgotPass(data) : Observable<any>{
    return this.http.post( this.domain + 'forgot_password.php', data)
    .map((res: Response) => res.json())
    .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  signUp(data) : Observable<any>{
    return this.http.post( this.domain + 'register_user.php', data)
    .map((res: Response) => res.json())
    .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  checkuser(data) : Observable<any>{
    return this.http.post( this.domain + 'check_user.php', data)
    .map((res: Response) => res.json())
    .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  signout() {
    localStorage.removeItem('user');
  }


}
