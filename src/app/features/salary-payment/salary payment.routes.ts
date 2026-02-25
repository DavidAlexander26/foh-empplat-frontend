import { Routes } from '@angular/router';

export const SALARY_PAYMENTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/salary-history/salary-history')
    },
    {
        path: 'nuevo',
        loadComponent: () => import('./pages/new-salary/new-salary')
    },
    {
        path: '**',
        redirectTo: '',
    }
]

export default SALARY_PAYMENTS_ROUTES;