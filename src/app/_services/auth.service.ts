import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;

  constructor(private http: Http) { }

  login(model: any) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'login', model, options).pipe(map((response: Response) => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    }));
  }
  }


