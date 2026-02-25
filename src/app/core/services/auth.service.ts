import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  RequestLogin,
  ResponseAccessTokenWrapper,
  ResponseUserProfile,
  GenericResponse
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiAuthUrl = environment.apiAuthUrl;

  login(
    credentials: RequestLogin,
    basicAuth: string
  ): Observable<ResponseAccessTokenWrapper> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${basicAuth}`
    });

    return this.http.post<ResponseAccessTokenWrapper>(
      `${this.apiAuthUrl}/auth/ctaemp/login`,
      credentials,
      { headers }
    );
  }

  getProfile(apikey: string, token: string): Observable<ResponseUserProfile> {
    return this.http.get<ResponseUserProfile>(
      `${this.apiAuthUrl}/auth/ctaemp/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apikey
        }
      }
    );
  }

  logout(token: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.apiAuthUrl}/v1/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
