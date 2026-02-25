import { Component, Input, ViewEncapsulation, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FohGrid } from '../../layouts/foh-grid/foh-grid';
import { FohCol } from '../../layouts/foh-col/foh-col';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationPopup } from '../notification-popup/notification-popup';
import { MatMenuModule } from '@angular/material/menu';
import { ProfilePopup } from "../profile-popup/profile-popup";
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    FohGrid,
    FohCol,
    MatMenuModule,
    NotificationPopup,
    ProfilePopup
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {
  private authStore = inject(AuthStore);
  notificationCount = 1;

  userFullName = computed(() => {
    const user = this.authStore.user();
    return user ? `${user.nombres} ${user.apellidos}` : '';
  });

  selectedCompany = computed(() => {
    const user = this.authStore.user();
    return user?.empresas?.[0]?.nomEmpresa ?? '';
  });

  companies = computed(() => {
    const user = this.authStore.user();
    return user?.empresas?.map(e => e.nomEmpresa) ?? [];
  });

  constructor(private sidebarService: SidebarService) { }

  isNotificationMenuOpen = false;

  onCompanyChange(company: string): void {
    //this.authStore.changeCompany(company);
    // Aquí puedes emitir un evento o hacer la lógica necesaria
    console.log('Empresa seleccionada:', company);
  }

  onNotificationClick(): void {
    // Lógica para manejar click en notificaciones
    this.isNotificationMenuOpen = true;
  }

  onProfileClick(): void {
    // Lógica para manejar click en perfil
    console.log('Perfil clicked');
  }
  // Alternar barra lateral (mobile)
  toggleSidebar() {
    this.sidebarService.toggle();
  }
}