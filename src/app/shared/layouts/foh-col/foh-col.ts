import { Component, input, computed } from '@angular/core';

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

@Component({
  selector: 'foh-col',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[style.--col-xs]': 'xs()',
    '[style.--col-sm]': 'sm()',
    '[style.--col-md]': 'md()',
    '[style.--col-lg]': 'lg()',
    '[style.--col-xl]': 'xl()',
  },
  styles: [
    `
      :host {
        display: block;
        grid-column: span var(--col-xs, 12) / span var(--col-xs, 12);
      }

      @media (min-width: 640px) {
        :host {
          grid-column: span var(--col-sm, var(--col-xs, 12)) / span var(--col-sm, var(--col-xs, 12));
        }
      }

      @media (min-width: 768px) {
        :host {
          grid-column: span var(--col-md, var(--col-sm, var(--col-xs, 12))) /
            span var(--col-md, var(--col-sm, var(--col-xs, 12)));
        }
      }

      @media (min-width: 1024px) {
        :host {
          grid-column: span var(--col-lg, var(--col-md, var(--col-xs, 12))) /
            span var(--col-lg, var(--col-md, var(--col-xs, 12)));
        }
      }

      @media (min-width: 1280px) {
        :host {
          grid-column: span var(--col-xl, var(--col-lg, var(--col-xs, 12))) /
            span var(--col-xl, var(--col-lg, var(--col-xs, 12)));
        }
      }
    `,
  ],
})
export class FohCol {
  xs = input<ColSize>();
  sm = input<ColSize>();
  md = input<ColSize>();
  lg = input<ColSize>();
  xl = input<ColSize>();
}
