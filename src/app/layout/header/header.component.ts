import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class HeaderComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> Feature-BeardtrustLLC-132/133/135
