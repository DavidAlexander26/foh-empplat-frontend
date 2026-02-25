import { Routes } from '@angular/router';

export const TRANSFERS_ROUTES: Routes = [

    {
        path: '',
        loadComponent: () => import('./pages/history/history')
    },
    {
        path: 'nuevo',
        loadComponent: () => import('./pages/new/new')
    },
    {
        path: '**',
        redirectTo: '',
    }
];

export default TRANSFERS_ROUTES