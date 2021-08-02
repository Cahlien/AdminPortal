import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  onLogout() {
    this.authService.logout();
  }
}
