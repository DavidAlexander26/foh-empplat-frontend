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

import { FohGrid } from '../../shared/layouts/foh-grid/foh-grid';
import { FohCol } from '../../shared/layouts/foh-col/foh-col';
import { BackButton } from '../../shared/components/back-button/back-button';

@Component({
  selector: 'app-movements-report',
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
    FohGrid,
    FohCol,
    BackButton
  ],
  templateUrl: './movements-report.html',
  styleUrl: './movements-report.css'
})
export class MovementsReport {
  today = new Date();
  displayedColumns: string[] = [
    'fechaOperacion',
    'fechaProceso',
    'nroOperacion',
    'nombreTransaccion',
    'descripcion',
    'canal',
    'importe'
  ];

  dataSource = new MatTableDataSource<any>();
  matPaginator = viewChild(MatPaginator);
  matSort = viewChild(MatSort);
  totalRecords = signal(0);
  pageSize = signal(10);
  filtros = {
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
    busqueda: ''
  };
  constructor() {
    this.dataSource.data = [
      {
        fechaOperacion: '16/10/2023',
        fechaProceso: '15/10/2023',
        nroOperacion: 'OPE-001234',
        nombreTransaccion: 'TRF-OUT',
        descripcion: 'Pago proveedores',
        canal: 'Portal Web',
        moneda: 'Soles',
        importe: 'S/ 25,000.00',
        saldoContable: 'S/ 125,000.50'
      },
      {
        fechaOperacion: '16/10/2023',
        fechaProceso: '16/10/2023',
        nroOperacion: 'OPE-001235',
        nombreTransaccion: 'TRF-OUT',
        descripcion: 'Pago servicios',
        canal: 'Portal Web',
        moneda: 'Soles',
        importe: 'S/ 5,000.00',
        saldoContable: 'S/ 120,000.50'
      },
      {
        fechaOperacion: '17/10/2023',
        fechaProceso: '17/10/2023',
        nroOperacion: 'OPE-001236',
        nombreTransaccion: 'TRF-IN',
        descripcion: 'Abono cliente',
        canal: 'App Móvil',
        moneda: 'Soles',
        importe: 'S/ 10,000.00',
        saldoContable: 'S/ 130,000.50'
      },
      {
        fechaOperacion: '18/10/2023',
        fechaProceso: '18/10/2023',
        nroOperacion: 'OPE-001237',
        nombreTransaccion: 'TRF-OUT',
        descripcion: 'Pago planilla',
        canal: 'Portal Web',
        moneda: 'Soles',
        importe: 'S/ 50,000.00',
        saldoContable: 'S/ 80,000.50'
      },
      {
        fechaOperacion: '19/10/2023',
        fechaProceso: '19/10/2023',
        nroOperacion: 'OPE-001238',
        nombreTransaccion: 'TRF-OUT',
        descripcion: 'Varios',
        canal: 'Ventanilla',
        moneda: 'Soles',
        importe: 'S/ 1,000.00',
        saldoContable: 'S/ 79,000.50'
      },
    ];
    this.totalRecords.set(this.dataSource.data.length);
  }

  ngAfterViewInit() {
    if (this.matPaginator()) this.dataSource.paginator = this.matPaginator()!;
    if (this.matSort()) this.dataSource.sort = this.matSort()!;
  }
  limpiarFiltros() {
    this.filtros = {
      fechaInicio: null,
      fechaFin: null,
      busqueda: ''
    };

  }
}
export default MovementsReport;
