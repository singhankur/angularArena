import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject }     from 'rxjs/Rx';
import { configObj } from '../../app.config';

@Injectable()
export class DashboardService {

  private url: string = configObj.serviceApi;

  constructor(private _http: Http) {}

  genericHttp(_url, params){
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.url + _url, body, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getAllAdminConstant(): Observable<Object> {
        return this._http.get(this.url + configObj.api.getAllAdminConstant)
        .catch(this.handleError);
  }

  setAdminConstant(params): Observable<Object> {
    return this.genericHttp(configObj.api.setAdminConstant, params);
  }

  createUser(params): Observable<Object> {
    return this.genericHttp(configObj.api.createUser, params);
  }

  getAllUser(params): Observable<Object> {
    return this.genericHttp(configObj.api.getAllUser, params);
  }

  deleteUser(params): Observable<Object> {
    return this.genericHttp(configObj.api.deleteUser, params);
  }

  packetGraphLastSevenDays(params): Observable<Object> {
    return this.genericHttp(configObj.api.packetGraphLastSevenDays, params);
  }

  packetGraphPerDay(params): Observable<Object> {
    return this.genericHttp(configObj.api.packetGraphPerDay, params);
  }

  revenueGraphLastSevenDays(params): Observable<Object> {
    return this.genericHttp(configObj.api.revenueGraphLastSevenDays, params);
  }

  revenueGraphPerDay(params): Observable<Object> {
    return this.genericHttp(configObj.api.revenueGraphPerDay, params);
  }

  extraAdminConstant(params): Observable<Object> {
    return this.genericHttp(configObj.api.extraAdminConstant, params);
  }

  private extractData(res: Response) {
    let body;
    try{
      body = res.json();
    }
    catch(err){
      body = res;
    }
    
    return body || { };
  }


  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
