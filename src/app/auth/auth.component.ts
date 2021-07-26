import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let response = this.authService.login(email, password)
      .subscribe((response: any) => {
        const token = response.headers.get('Authorization');
        const userId = response.headers.get('BTUID');
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      })
  }
}
