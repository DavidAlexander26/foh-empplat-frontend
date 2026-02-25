import { Component, ViewEncapsulation } from '@angular/core';
import { InfoPanelComponent } from '../components/info-panel/info-panel.component';
import { SignInFormComponent } from '../components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in-container',
  standalone: true,
  imports: [InfoPanelComponent, SignInFormComponent],
  templateUrl: './sign-in.container.html',
  styleUrls: ['./sign-in.container.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SignInContainerComponent {
}