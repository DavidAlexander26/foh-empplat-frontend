import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AuthStore } from '../../core/store/auth.store';

export const headerConfigurationInterceptor: HttpInterceptorFn = (req, next) => {
    //   const store = inject(MyStore);
    //   const userId = store.userId();
    //   const companyRuc = store.companyRuc();
    const newReq = req.clone({
        setHeaders: {
            'X-User-Id': '123456',
            'X-Correlation-Id': uuidv4(),
            'X-Company-RUC': '12312312312',
            'Content-Type': 'application/json'
        },
    });
    return next(newReq);
};