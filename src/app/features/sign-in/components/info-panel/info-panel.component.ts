import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatIconModule],
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InfoPanelComponent {
  features = [
    { text: 'Gestión de cuentas sueldo', icon: 'check_circle' },
    { text: 'Gestión de pagos de haberes', icon: 'check_circle' },
    { text: 'Gestión de transferencias', icon: 'check_circle' }
  ];
}