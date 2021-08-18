import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  token: any = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
      'Authorization': this.token
    })
  };

  httpOptionsUnsecured = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
      //'Authorization': this.token
    })
  };

  getAll(url: string, security: boolean){
    if(security){
      return this.http.get(url, this.httpOptions);
    }
    else{
      return this.http.get(url, this.httpOptionsUnsecured);
    }
  }

  getById(url: string, security: boolean){
    if(security){
      return this.http.get(url, this.httpOptions);
    }
    return this.http.get(url, this.httpOptionsUnsecured);
  }

  deleteById(url: string, security: boolean){
    if(security){
      return this.http.delete(url, this.httpOptions);
    }
    return this.http.delete(url, this.httpOptionsUnsecured);
  }

  create(url: string, obj: any, security: boolean){
    if(security){
      return this.http.post(url, obj, this.httpOptions);
    }
    return this.http.post(url, obj, this.httpOptionsUnsecured);
  }

  update(url: string, obj: any, security: boolean){
    if(security){
      return this.http.put(url, obj, this.httpOptions);
    }
    return this.http.put(url, obj, this.httpOptionsUnsecured);
  }

}
