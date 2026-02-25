import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './shared/config/paginator';
import { headerConfigurationInterceptor } from './shared/interceptors/headerConfiguration.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerConfigurationInterceptor])
    ),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
};
