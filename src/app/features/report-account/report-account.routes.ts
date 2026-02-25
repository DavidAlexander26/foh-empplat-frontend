import { Routes } from '@angular/router';

export const REPORT_ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/report-history/report-history'),
    },
    {
        path: '**',
        redirectTo: '',
    }
]

export default REPORT_ACCOUNT_ROUTES;