import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject }     from 'rxjs/Rx';
import { configObj } from '../../app.config';

@Injectable()
export class LedgerAccountService {

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

  createLedger(params): Observable<Object> {
    return this.genericHttp(configObj.api.createLedger, params);
  }

  searchLedgerAccount(params): Observable<Object> {
    return this.genericHttp(configObj.api.searchLedgerAccount, params);
  }

  ledgerAccountInformation(params): Observable<Object> {
    return this.genericHttp(configObj.api.ledgerAccountInformation, params);
  }

  ledgerTransactionIformation(params): Observable<Object> {
    return this.genericHttp(configObj.api.ledgerTransactionIformation, params);
  }

  createLedgerTransaction(params): Observable<Object> {
    return this.genericHttp(configObj.api.createLedgerTransaction, params);
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
