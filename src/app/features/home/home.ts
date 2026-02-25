import { Component, ViewEncapsulation, AfterViewInit, viewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FohGrid } from '../../shared/layouts/foh-grid/foh-grid';
import { FohCol } from '../../shared/layouts/foh-col/foh-col';
import { MatListModule } from "@angular/material/list";
import { AuthStore } from '../../core/store/auth.store';
import { effect } from '@angular/core';
import { AccountInfo, UserInfo } from '../../core/models/profile.models';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'home',
  styleUrls: ['home.scss'],
  templateUrl: 'home.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatDividerModule,
    FohGrid,
    FohCol,
    MatListModule
],
  encapsulation: ViewEncapsulation.Emulated
})
export class Home implements OnInit, AfterViewInit {
  private authStore = inject(AuthStore);
  userInfo: UserInfo | null = null;

  // Datos de cuentas
  private accountsData: AccountInfo[] = [
    {
      numeroCuenta: '000123456789',
      cci: '002-123-000123456789-01',
      saldoDisponible: 120000.00,
      saldoRetenido: 10000.00,
      moneda: 'SOLES',
      estado: 'PENDIENTE'
    },
    {
      numeroCuenta: '120123456789',
      cci: '002-123-120123456789-01',
      saldoDisponible: 80000.00,
      saldoRetenido: 5000.00,
      moneda: 'DÓLARES',
      estado: 'NUEVO'
    },
    {
      numeroCuenta: '120123456789',
      cci: '002-123-120123456789-01',
      saldoDisponible: 80000.00,
      saldoRetenido: 5000.00,
      moneda: 'DÓLARES',
      estado: 'RECHAZADO'
    },
    {
      numeroCuenta: '120123456789',
      cci: '002-123-120123456789-01',
      saldoDisponible: 80000.00,
      saldoRetenido: 5000.00,
      moneda: 'DÓLARES',
      estado: 'ACTIVO'
    },
    {
      numeroCuenta: '120123456789',
      cci: '002-123-120123456789-01',
      saldoDisponible: 80000.00,
      saldoRetenido: 5000.00,
      moneda: 'DÓLARES',
      estado: 'APROBADO'
    },
    {
      numeroCuenta: '120123456789',
      cci: '002-123-120123456789-01',
      saldoDisponible: 80000.00,
      saldoRetenido: 5000.00,
      moneda: 'DÓLARES',
      estado: 'PENDIENTE'
    }
  ];

  // DataSource para la tabla con sorting
  dataSource: MatTableDataSource<AccountInfo>;
  sort = viewChild.required<MatSort>('sort');

  displayedColumns: string[] = [
    'numeroCuenta', 
    'cci', 
    'saldoDisponible', 
    'saldoRetenido', 
    'moneda', 
    'estado'
  ];

  constructor() {
    // Inicializar el dataSource con los datos de cuentas
    this.dataSource = new MatTableDataSource(this.accountsData);
    effect(() => {
      const profile = this.authStore.user();
      if (!profile) {
        this.userInfo = null;
        return;
      }

      this.userInfo = {
        nombre: `${profile.nombres} ${profile.apellidos}`,
        dni: 'CONFIRMAR',
        razonSocial: profile.empresas?.[0]?.nomEmpresa ?? '',
        ruc: profile.empresas?.[0]?.codEmpresa ?? ''
      };
    });
  }

  ngOnInit(): void {
    //this.loadProfile();
    this.authStore.getProfile();
  }

  ngAfterViewInit(): void {
    // Configurar el sorting después de que la vista se inicialice
    this.dataSource.sort = this.sort();
  }

  /*
  private loadProfile(): void {
    const token= this.authStore.accessToken();
    const apikey= environment.headers['x-api-key'];

    if(!token) return;

    this.authService.getProfile(apikey, token).subscribe({
      next: (response)=>{
        if(response.codigo===0 && response.data){
          const profile= response.data;

          this.userInfo={
            nombre: `${profile.nombres} ${profile.apellidos}`,
            dni: "CONFIRMAR",
            razonSocial: profile.empresas[0].nomEmpresa,
            ruc: profile.empresas[0].codEmpresa
          };
        }
      },
      error: (err)=>{
        console.error('Error al cargar el perfil:', err);
      }
    });
  }
    */ // Ya no utilizado, borrar luego de confirmar la solucion

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Texto copiado al portapapeles:', text);
    });
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  getStatusClass(estado: string): string {
    return `status-${estado.toLowerCase()}`;
  }
}

export default Home;