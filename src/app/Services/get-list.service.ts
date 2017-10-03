import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetListService {
  constructor(private _http: Http) {
  }
  Getlist(url) {
    let header = new Headers({'Access-Control-Allow-Origin': '*', "Accept": "application/json"});
    return this._http.get(url, {headers: header});
  }
  private _buildParams(params: any) {
    let urlSearchParams = new URLSearchParams();

    for(let key in params){
        if(params.hasOwnProperty(key)){
            urlSearchParams.append(key, params[key]);
        }
    }
    return urlSearchParams.toString();
}
  Postlist(url, data) {
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this._http.post(url, this._buildParams(data), {headers: header});
  }

}
