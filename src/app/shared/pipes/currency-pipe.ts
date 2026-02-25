import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | string, currency: string): string {
    if (value == null || value === '') return '';

    const num = Number(value);
    if (isNaN(num)) return value.toString();

    const symbol = currency === 'USD' ? '$' : 'S/';
    const formatted = num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    });

    return `${symbol} ${formatted}`;
  }
}