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

  getAll(url: string){
    return this.http.get(url, this.httpOptions);
  }

  getById(url: string){
    return this.http.get(url, this.httpOptions);
  }

  deleteById(url: string){
    return this.http.delete(url, this.httpOptions);
  }

  create(url: string, obj: any){

    return this.http.post(url, obj, this.httpOptions);
  }

  update(url: string, obj: any){
    return this.http.put(url, obj, this.httpOptions);
  }

}
