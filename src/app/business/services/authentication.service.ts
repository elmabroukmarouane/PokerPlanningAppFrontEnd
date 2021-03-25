import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/infrastructure/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js'

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
                  localStorage.setItem('tokenS', this.encryptPassword(password));
                  localStorage.setItem('token', user.Token);
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  return user;
                }
              )
            );
    }

    autoLogin(email: string, password: string) {
        return this.http.post<any>(`${API_URL}/Authentication/Login`, { email, password }, httpOptions)
            .pipe(
              map(
                user => {
                  localStorage.removeItem('tokenS');
                  localStorage.removeItem('token');
                  localStorage.removeItem('currentUser');
                  localStorage.setItem('tokenS', this.encryptPassword(password));
                  localStorage.setItem('token', user.Token);
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  console.log('OK :D !');
                }
              )
            );
    }

    encryptPassword(password): string {
      return CryptoJS.AES.encrypt(password, environment.hashMessage).toString();
    }

    decryptPassword(password): string {
      return CryptoJS.AES.decrypt(password, environment.hashMessage).toString(CryptoJS.enc.Utf8); 
    }

    logout() {
        localStorage.removeItem('tokenS');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser')); 
    }

    getToken(): string {
      return localStorage.getItem('token');
    }

    getPassword(): string {
      return this.decryptPassword(localStorage.getItem('tokenS'));
    }
}
