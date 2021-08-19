
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private accountId: String = '';

  constructor(private http: HttpClient) { }

<<<<<<< HEAD
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

  getAccounts(page: number, size: number, sort?: string, asc?: boolean, dsc?: boolean, search?: string) {
    let query = `http://localhost:9001/accounts/all?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`;
    if (sort !== undefined) {
      query += `&sort=${encodeURIComponent(sort)}&asc=${encodeURIComponent(!!asc)}`;
    }
    // if (asc) {
    //   query += `&asc=${encodeURIComponent(!!asc)}`;
    // }
    // if (dsc) {
    //   query += `&dsc=${encodeURIComponent(!!dsc)}`;
    // }
    if (search !== undefined) {
      query += `&search=${encodeURIComponent(search)}`;
    }
    console.log('Outbound Query: ', query)
    return this.http.get(query, this.getHeaders() );
  }

  getUsers(page: number, size: number, sort?: string, asc?: boolean, search?: string) {
    let query = `http://localhost:9001/accounts/all?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`;
    if (sort !== undefined) {
      query += `&sort=${encodeURIComponent(sort)}&asc=${encodeURIComponent(!!asc)}`;
    }
    if (search !== undefined) {
      query += `&search=${encodeURIComponent(search)}`;
    }
    return this.http.get(query, this.getHeaders() );
  }

  deleteById(url: string) {
    return this.http.delete(url, this.getHeaders());
  }

  create(url: string, obj: any) {
    return this.http.post(url, obj, this.getHeaders());
  }

  update(url: string, obj: any) {
    return this.http.put(url, obj, this.getHeaders());
=======
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
>>>>>>> Feature-BeardtrustLLC-132/133/135
  }

}
