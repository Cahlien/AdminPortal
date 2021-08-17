import { getNumberOfCurrencyDigits } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private accountId: String = '';

  constructor(private http: HttpClient) { }

  getHeaders() {
    let token = localStorage.getItem('token');
    if (token !== null) {
      token = token;
    } else {
      token = "a string!";
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  getAll(url: string) {
    return this.http.get(url, this.getHeaders());
  }

  getById(url: string) {
    return this.http.get(url, this.getHeaders());
  }

  async getNewAccount(url: string): Promise<String> {
    console.log('inbound url: ', url)
    await this.http.get(url, this.getHeaders()).toPromise().then(
      (res) => {
        let uuid: any;
        uuid = res;
        this.accountId = uuid.accountId;
      }, err => {
        alert(err);
      }
    );
    return this.accountId;
  }

  //Send the url, type and name of the param. eg. typename = 'userId' type = the actual Id
  getParams(url: string, type: string, typeName: string) {
    let myparams = new HttpParams().set(typeName, type);
    return this.http.get(url, this.getHeaders());
  }

  deleteById(url: string) {
    return this.http.delete(url, this.getHeaders());
  }

  create(url: string, obj: any) {
    return this.http.post(url, obj, this.getHeaders());
  }

  update(url: string, obj: any) {
    return this.http.put(url, obj, this.getHeaders());
  }

}
