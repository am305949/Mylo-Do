import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { WebService } from './web.service';


export interface AuthResponseData {
  token: string,
  expiresIn: number,
  userId: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticated = false;
  private token: any;
  private tokenTimer: any;
  private userId: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private webService: WebService, private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signUp(email: string, password: string, name: string) {
    this.webService.post(`users/signup`,
      {
        email: email,
        password: password,
        name: name
      })
      .subscribe(response => {
        // this.router.navigate(["/users/login"]);
      });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "http://localhost:8080/users/login",
      {
        email: email,
        password: password
      }
    )
      .pipe(
        tap((response: any) => {
          this.authLogin(response)
        })
        ,catchError(this.ErrorHandling))
  }


  authLogin(response: any) {
    const token = response.token;
    this.token = token;

    if (token) {
      const tokenInfo = this.getDecodedAccessToken(token); // decode token

      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.userId = response.userId;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(token, expirationDate, this.userId);
      this.router.navigate([`/${this.userId}/groups`])
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/users/login"]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const tokenInfo = this.getDecodedAccessToken(token); // decode token

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    }
  }

  private ErrorHandling(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error'
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.status) {
      case 401:
        errorMessage = 'Invalid Email or Password'
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  private getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

}
