import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { longStackSupport } from 'q';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged in succesfully');
    }, error => {
      this.alertify.error(error);
    }

    );
  }

    logout() {
      this.authService.userToken = null;
      localStorage.removeItem('token');
      this.alertify.message('logged out');
    }

    loggedIn() {
      return this.authService.loggedIn();
    }
}
