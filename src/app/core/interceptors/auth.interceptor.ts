import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const token = store.accessToken();

  let headers = req.headers
    .set('codigo-canal', 'XXXWEB')
    .set('x-application', 'PORTAL')
    .set('x-device-id', 'WEB')
    .set('x-device-ip', '127.0.0.1')
    .set('x-model', 'Browser')
    .set('x-plataform', 'WEB')
    .set('x-version', '1.0');

  if (environment.headers) {
    Object.entries(environment.headers).forEach(([key, value]) => {
      if (!headers.has(key)) {
        headers = headers.set(key, value);
      }
    });
  }

  if (
    token &&
    req.url.startsWith(environment.apiAuthUrl) &&
    !headers.has('Authorization')
  ) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return next(req.clone({ headers }));
};
