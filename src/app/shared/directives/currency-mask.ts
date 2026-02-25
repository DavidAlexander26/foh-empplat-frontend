import { Directive, HostListener, ElementRef } from '@angular/core';
import { convertToCurrencyFormat } from '../utils/currencyUtils';
@Directive({
  selector: '[currencyMask]'
})
export class CurrencyMask {
  
  constructor(
    private el: ElementRef<HTMLInputElement> ) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
      const key = event.key;
      const value = this.el.nativeElement.value;
      
      if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(key)) {
        return;
      }
      if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(key.toLowerCase())) {
        return;
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
        return;
      }
      if (key === '.' && !value.includes('.')) {
        return;
      }
      if (!/^\d$/.test(key)) {
        event.preventDefault();
      }
    }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const temporalNumber = Number(value.replace(/,/g, ''))

    if(isNaN(temporalNumber)){
      return;
    }

    this.el.nativeElement.value = convertToCurrencyFormat(value);
  }
}
