import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get("https://run.mocky.io/v3/3320d31a-8849-4792-9bfb-ab1a668ecb45");
  }
}
