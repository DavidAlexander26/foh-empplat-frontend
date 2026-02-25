import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'foh-grid',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[style.--gap]': 'gap() ? gap() + "rem" : null',
    '[style.--gap-md]': 'mdGap() ? mdGap() + "rem" : null',
    '[class]': 'class()'
  },
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        width: 100%;
      }

    `
  ]
})
export class FohGrid {
  gap = input<number>();
  mdGap = input<number>();
  class = input<string>('');
  style = input<string>('');
}
