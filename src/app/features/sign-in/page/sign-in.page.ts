import { Component } from '@angular/core';
import { SignInContainerComponent } from '../containers/sign-in.container';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [SignInContainerComponent],
  template: '<app-sign-in-container></app-sign-in-container>'
})
export class SignInPageComponent {
}