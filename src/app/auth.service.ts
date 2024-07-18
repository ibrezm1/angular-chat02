import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authUrl =  environment.apiUrl +  '/authenticate';  // Your Flask authentication URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });

    return this.http.post<{ success: boolean }>(this.authUrl, body, { headers })
      .pipe(
        map(response => {
          this.isAuthenticated = response.success;
          return response.success;
        }),
        catchError(error => {
          console.error('Login error', error);
          return [false];
        })
      );
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('authData');
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  getAuthData(): string | null {
    return localStorage.getItem('authData');
  }
}
