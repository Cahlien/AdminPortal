
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  async getNewUUID(url: string): Promise<String> {
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

  getAccounts(page: number, size: number, sort?: string, dir?: string, search?: string) {
    let query = `http://localhost:9001/accounts/all?pageNum=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(size)}`;
    if (sort === undefined && dir === undefined) {
      sort = "accountId"; dir = "asc";
    }
    if (search === undefined) {
      search = "";
    }
    if (sort !== undefined && dir !== undefined) {
      query += `&sortName=${encodeURIComponent(sort)}&sortDir=${encodeURIComponent(dir)}`;
    }
    if (search !== undefined) {
      query += `&search=${encodeURIComponent(search)}`;
    }
    console.log('Outbound Query: ', query);
    return this.http.get(query, this.getHeaders() );
  }

  getUsers(page: number, size: number, sort?: string, asc?: boolean, search?: string) {
    let query = `http://localhost:9001/admin/users?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`;
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
    console.log('create called')
    return this.http.post(url, obj, this.getHeaders());
  }

  update(url: string, obj: any) {
    console.log('update called')
    return this.http.put(url, obj, this.getHeaders());
  }

}
