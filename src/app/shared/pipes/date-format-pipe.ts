import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, showTime: boolean = true): string {
    if (!value) return '';

    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (!showTime) {
      return `${day}/${month}/${year}`;
    }

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 → 12
    const hoursStr = hours.toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hoursStr}:${minutes} ${ampm}`;
  }
}
