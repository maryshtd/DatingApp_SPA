import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { longStackSupport } from 'q';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in succesfully');
    }, error => {
      console.log(error);
    }
    // console.log(this.model);
    );
  }

    logout() {
      this.authService.userToken = null;
      localStorage.removeItem('token');
      console.log('logged out');
    }

    loggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
    }


}
