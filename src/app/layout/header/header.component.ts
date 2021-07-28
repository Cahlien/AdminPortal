import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

}
