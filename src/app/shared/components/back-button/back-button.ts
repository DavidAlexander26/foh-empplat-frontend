import { Component, inject, input } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'foh-back-button',
  templateUrl: './back-button.html',
  styles: [`
    :host{
      display: block;
      margin-top:12px;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: lighter;
      cursor: pointer;
      font-size:  1.6rem;
      color: #333;
      line-height: var(--line-height-relaxed);
      transition: color 0.2s ease;
      user-select: none;
    }

    .back-link:hover {
      color: #1A73E8;
    }

    .back-link:hover .back-icon {
      transform: translateX(-2px);
    }
    .back-icon {
      transition: all 0.2s ease;
    }
  `]
})
export class BackButton {
  text = input<string>('Volver al listado');
  route = input<string | undefined>();
  useHistory = input<boolean>(false);

  private router = inject(Router);
  private location = inject(Location);

  onBackClick(): void {
    if (this.useHistory()) {
      this.location.back();
    } else if (this.route()) {
      this.router.navigate([this.route()!]);
    } else {
      this.location.back();
    }
  }
}
