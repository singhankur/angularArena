import { Injectable } from '@angular/core';
import { configObj } from '../app.config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';



@Injectable() 
export class AppService {

  private url: string = configObj.serviceApi;

  priceConstants: Object;

  constructor(private _http: Http) {}

  genericHttp(_url, params){
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.url + _url, body, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  createKisan(params): Observable<Object> {
    return this.genericHttp(configObj.api.createKisan, params);
  }

  createVyapari(params): Observable<Object> {
    return this.genericHttp(configObj.api.createVyapari, params);  
  }

  searchProfiles(params): Observable<Object> {
    return this.genericHttp(configObj.api.search, params);
  }

  getProfile(params): Observable<Object> {
    return this.genericHttp(configObj.api.profile, params);
  }

  getUserTranscations(params): Observable<Object> {
    return this.genericHttp(configObj.api.getUserTransactions, params);
  }
  getAdminConstant(params): Observable<Object> {
    return this.genericHttp(configObj.api.getAdminConstant, params);
  }

  createTransaction(params): Observable<Object> {
    return this.genericHttp(configObj.api.createTransaction, params);
  }

  getEnlistedVyaparis(): Observable<any> {
    return this._http.get(this.url + configObj.api.getEnlistedVyaparis)
    .catch(this.handleError);
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
