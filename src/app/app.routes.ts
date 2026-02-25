import { Routes } from '@angular/router';
import { ClientLayout } from './shared/layouts/client-layout/client-layout';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [guestGuard],
        loadChildren: () => import('./features/sign-in/sign-in.routes')
    },
    {
        path: '',
        component: ClientLayout,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: 'inicio',
                loadComponent: () => import('./features/home/home')
            },
            {
                path: 'perfil',
                loadComponent: () => import('./features/home/pages/profile/profile')
            },
            {
                path: 'cuentas-sueldo',
                loadChildren: () => import('./features/salary-account/salary-account.routes')
            },
            {
                path: 'pago-haberes',
                loadChildren: () => import('./features/salary-payment/salary payment.routes')
            },
            {
                path: 'transferencias',
                loadChildren: () => import('./features/transfer/transfer.routes')
            },
            {
                path: 'reportes/movimientos',
                loadComponent: () => import('./features/movements-report/movements-report')
            },
            {
                path: 'reportes/estado-cuenta',
                loadComponent: () => import('./features/account-status-report/account-status-report')
            },
            {
                path: 'reportes/apertura-cuentas',
                loadChildren: () => import('./features/report-account/report-account.routes')
            },
            {
                path: 'reportes/pago-haberes',
                loadChildren: () => import('./features/report-payment/report-payment.routes')
            },
            {
                path: 'reportes/transferencias',
                loadComponent: () => import('./features/transfer-report/transfer-report').then(m => m.TransferReport)
            },
            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
