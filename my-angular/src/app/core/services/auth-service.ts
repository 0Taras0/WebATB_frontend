import {inject, Injectable, signal} from '@angular/core';
import {ApiService} from './api-service';
import {RegisterModel, TokenResponse} from '../../features/auth/models/auth.interfaces';
import {serialize} from 'object-to-formdata';
import {Observable, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  email: string;
  name: string;
  image: string;
  roles: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(null);
  private _decoded = signal<JwtPayload | null>(null);

  private apiUrl = `account/`;
  private cookieService = inject(CookieService);

  constructor(private api: ApiService) {
    this.loadTokenFromStorage();
  }

  register(registerModel: RegisterModel): Observable<TokenResponse> {
    const formData = serialize(registerModel);
    return this.api.post<TokenResponse>(`${this.apiUrl}register`, formData)
      .pipe(
        tap(val => {
          this.login(val.token);
        })
      );
  }

  get token() {
    return this._token();
  }

  get user() {
    return this._decoded();
  }

  isAuthenticated() {
    if (!this._token()) {
      this.loadTokenFromStorage();
    }
    return !!this._token();
  }

  login(token: string) {
    this._token.set(token);
    this.cookieService.set('token', token);
    this.decodeAndSet(token);
  }

  logout() {
    this._token.set(null);
    this._decoded.set(null);
    this.cookieService.delete('token');
  }

  loadTokenFromStorage() {
    const saved = this.cookieService.get('token');
    if (saved) {
      this._token.set(saved);
      this.decodeAndSet(saved);
    }
  }

  private decodeAndSet(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      this._decoded.set(decoded);
    } catch (e) {
      console.error('JWT decode error:', e);
      this._decoded.set(null);
    }
  }
}
