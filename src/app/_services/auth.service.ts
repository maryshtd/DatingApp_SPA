import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).pipe(map((response: Response) => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log(this.decodedToken);
        this.userToken = user.tokenString;
      }
    })).pipe(catchError(this.handleError));
    }

    register(model: any) {
      return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).pipe(catchError(this.handleError));
    }

    private requestOptions() {
      const headers = new Headers();
      headers.append('Content-type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      return new RequestOptions({headers: headers});
    }

    private handleError(error: any) {
      const applicationError = error.headers.get('Application-Error');
      if (applicationError) {
        return throwError(applicationError);
      }
      const serverError = error.json();
      let modelStateErrors = '';
      if (serverError) {
        for (const key in serverError) {
          if (serverError[key]) {
            modelStateErrors += serverError[key] + '\n';
          }
        }
      }
      return throwError(
        modelStateErrors || 'Server error');
    }

    loggedIn() {
      return tokenNotExpired('token');
    }
  }


