import { Routes } from '@angular/router';

export const REPORT_ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/report-payment/report-payment'),
    },
    {
        path: '**',
        redirectTo: '',
    }
]

export default REPORT_ACCOUNT_ROUTES;