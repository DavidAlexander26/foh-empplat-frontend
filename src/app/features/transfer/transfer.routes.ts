import { Routes } from '@angular/router';

export const TRANSFERS_ROUTES: Routes = [
    {
        path: 'nuevo',
        loadComponent: () => import('./pages/new-transfer/new-transfer')
    },
    {
        path: '',
        loadComponent: () => import('./pages/transfer-history/transfer-history')
    },
    {
        path: '**',
        redirectTo: '',
    }
];

export default TRANSFERS_ROUTES