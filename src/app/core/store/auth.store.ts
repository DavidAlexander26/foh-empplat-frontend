import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RequestLogin, UserProfile } from '../models/auth.models';
import { environment } from '../../../environments/environment';

type AuthState = {
    user: UserProfile | null;
    accessToken: string | null;
    refreshToken: string | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    login: rxMethod<RequestLogin>(
      pipe(
        tap(() =>
          patchState(store, { isLoading: true, error: null })
        ),

        switchMap(credentials => {
          const basicAuth = btoa(
            `${environment.basicAuth.username}:${environment.basicAuth.password}`
          );
          return authService.login(credentials, basicAuth).pipe(
            tap(response => {
              if (response.codigo === 0 && response.data) {
                patchState(store, {
                  accessToken: response.data.access_token,
                  refreshToken: response.data.refresh_token,
                  role: response.data.role,
                  isAuthenticated: true,
                  isLoading: false
                });
              } else {
                patchState(store, {
                  isLoading: false,
                  error: response.mensaje
                });
              }
            }),

            catchError(err => {
              patchState(store, {
                isLoading: false,
                error: err.error?.mensaje ?? 'Error de login'
              });
              return EMPTY;
            })
          );
        })
      )
    ),

    getProfile: rxMethod<void>(
      pipe(
        switchMap(()=>{
          const token= store.accessToken();
          if(!token) return EMPTY;

          return authService.getProfile(environment.headers['x-api-key'], token);
        }),

        tap(response=>{
          if(response.codigo===0){
            patchState(store, {
              user: response.data,
              isAuthenticated: true
            })
          }
        }),
        catchError(()=>EMPTY)
      )
    ),

    logout: rxMethod<void>(
      pipe(
        tap(() => patchState(store, initialState)),
        tap(() => router.navigate(['/login']))
      )
    )
  })),
);
