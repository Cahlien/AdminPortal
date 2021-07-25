import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAll(url: string){
    return this.http.get(url);
  }

  getById(url: string){
    return this.http.get(url);
  }

  deleteById(url: string){
    return this.http.delete(url);
  }

  create(url: string, obj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(url, obj, httpOptions);
  }

  update(url: string, obj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.put(url, obj, httpOptions);
  }

}
