import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/infrastructure/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${API_URL}/Authentication/Login`, { email, password }, httpOptions)
            .pipe(
              map(
                user => {
                  console.log(user);
                  localStorage.setItem('token', user.Token);
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  return user;
                }
              )
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser')); 
    }

    getToken(): string {
      return localStorage.getItem('token');
    }
}
