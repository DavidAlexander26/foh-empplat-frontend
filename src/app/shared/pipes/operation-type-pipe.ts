import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operationTypePipe'
})
export class OperationTypePipe implements PipeTransform {

  transform(value: string): string {

    if (value === 'PAYROLL_PAYMENT') {
      return 'Pago de haberes';
    }
    return 'Transferencia';
  }

}
