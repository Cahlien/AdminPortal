import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  url: string = 'http://localhost:9001/users/login';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'LR-Type': 'admin'});

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(
      this.url,
      {
        email,
        password
      },
      {
        observe: "response",
        headers: this.headers
      });
  }
}
