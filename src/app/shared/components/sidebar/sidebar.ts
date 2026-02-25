import { Component, signal, computed, inject, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'foh-sidebar',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,//separar visualmente
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class Sidebar {
  private isMobile = signal(false);
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Signal para manejar si el menú de reportes está abierto
  reportsMenuOpen = signal(false);

  sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');
  isOpened = computed(() => !this.isMobile());

  constructor(
    private sidebarService: SidebarService,
    // router se ha movido para uniformidad en el código
    private router: Router
  ) {
    this.checkScreenSize();
  }

  // Computed para detectar si estamos en alguna ruta de reportes O si el menú está abierto
  isReportsActive = computed(() =>
    this.router.url.startsWith('/reportes') || this.reportsMenuOpen()
  );

  menuItems = [
    { icon: 'home', label: 'Inicio', route: '/inicio' },
    { icon: 'account', label: 'Cuentas Sueldo', route: '/cuentas-sueldo' },
    { icon: 'payment', label: 'Pago de Haberes', route: '/pago-haberes' },
    { icon: 'transfer', label: 'Transferencias', route: '/transferencias' }
  ];

  reportItems = [
    { label: 'Reporte de apertura de cuentas', route: '/reportes/apertura-cuentas' },
    { label: 'Reporte de pago de haberes', route: '/reportes/pago-haberes' },
    { label: 'Reporte de transferencias', route: '/reportes/transferencias' },
    { label: 'Reporte de movimientos', route: '/reportes/movimientos' },
    { label: 'Reporte de estado de cuenta', route: '/reportes/estado-cuenta' }
  ];

  //sombreado
  isReportsRouteActive(): boolean {
    return this.reportItems.some(item => this.router.url.includes(item.route));
  }

  onResize() {
    this.checkScreenSize();
  }

  // Métodos para manejar el estado del menú de reportes
  onReportsMenuOpened() {
    console.log('Menu reportes abierto');
    this.reportsMenuOpen.set(true);
  }

  onReportsMenuClosed() {
    console.log('Menu reportes cerrado');
    this.reportsMenuOpen.set(false);
  }

  private checkScreenSize() {
    this.isMobile.set(window.innerWidth <= 768);
  }
  //Aplicacion del servicio para sidebar
  ngAfterViewInit() {
    this.sidebarService.register(this.sidenav);
  }
}
