import { Routes } from '@angular/router';

export const SIGN_IN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/sign-in.page').then(m => m.SignInPageComponent)
  }
];

export default SIGN_IN_ROUTES;