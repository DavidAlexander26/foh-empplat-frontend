import { Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FohGrid } from '../../shared/layouts/foh-grid/foh-grid';
import { FohCol } from '../../shared/layouts/foh-col/foh-col';
import { BackButton } from '../../shared/components/back-button/back-button';

@Component({
  selector: 'app-transfer-report',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FohGrid,
    FohCol,
    BackButton
  ],
  templateUrl: './transfer-report.html',
  styleUrl: './transfer-report.css' // Asegúrate de crear este archivo aunque esté vacío
})
export class TransferReport {
  today = new Date();

  displayedColumns: string[] = [
      'estado',
      'creacion',
      'aprobadores',
      'nroSolicitud',
      'descripcion',
      'cuentaCargo',
      'cuentaDestino',
      'canal', // Entidad Intermediaria
      'monto',
      'comisiones'
    ];

  dataSource = new MatTableDataSource<any>();
  matPaginator = viewChild(MatPaginator);
  matSort = viewChild(MatSort);
  totalRecords = signal(0);
  pageSize = signal(10);
  filtros = {
    estado: '',       // Para el Select
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null
  };

  constructor() {

      this.dataSource.data = [
        {
          estado: 'Exitoso',
          creacion: '16/10/2023 02:30:25 pm',
          aprobadores: ['María González Mendoza', 'Carlos Ramírez López'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Interbank',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Fallido',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza', 'Carlos Ramírez López'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Banco de la Nación',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Interbank',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza', 'Carlos Ramírez López'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Scotiabank',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'BCP',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },


        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Banco de la Nación',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza', 'Carlos Ramírez López'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Scotiabank',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'BCP',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Scotiabank',
          monto: 'S/ 30.00'
        },
        {
          estado: 'Procesando',
          creacion: '16/10/2023 02:30:25 am',
          aprobadores: ['María González Mendoza'],
          nroSolicitud: 'TRF-2024-001234',
          descripcion: 'Pago proveedores - Servicios Generales',
          cuentaCargo: '000-123456789',
          cuentaDestino: '000-123456789 ',
          canal: 'Interbank',
          monto: 'S/ 15,000.00',
          comisiones: 'S/ 30.00'
        }
      ];

      this.totalRecords.set(this.dataSource.data.length);
  }

  ngAfterViewInit() {
    if (this.matPaginator()) this.dataSource.paginator = this.matPaginator()!;
    if (this.matSort()) this.dataSource.sort = this.matSort()!;
  }
  getStatusClass(estado: string): string {
    //  'status-procesando', 'status-exitoso', 'status-fallido'
    return `status-${estado.toLowerCase()}`;
  }
  limpiarFiltros() {
    this.filtros = {
      estado: '',
      fechaInicio: null,
      fechaFin: null
    };
  }

}
export default TransferReport;
