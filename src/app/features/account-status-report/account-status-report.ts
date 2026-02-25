import { Component, signal, viewChild,ViewEncapsulation,Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {provideNativeDateAdapter, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter  } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


import { FohGrid } from '../../shared/layouts/foh-grid/foh-grid';
import { FohCol } from '../../shared/layouts/foh-col/foh-col';
import { BackButton } from '../../shared/components/back-button/back-button';
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');

      if (str.length === 2) {
        const month = Number(str[0]) - 1; // Enero es 0
        const year = Number(str[1]);
        return new Date(year, month, 1);
      }
    }
    return super.parse(value);
  }
}


export const MY_FORMATS = {
  parse: {
    dateInput: ['MM/YYYY', 'MM/YYYY', 'MM-YYYY'],
  },
  display: {
    dateInput: { month: '2-digit', year: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-account-status-report',
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
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
  templateUrl: './account-status-report.html',
  styleUrl: './account-status-report.css',
  encapsulation: ViewEncapsulation.None
})
export class AccountStatusReport {
  maxDate = new Date();

  displayedColumns: string[] = [
    'numeroCuenta',
    'cci',
    'moneda',
    'razonSocial',
    'saldoDisponible',
    'saldoContable'
  ];

  dataSource = new MatTableDataSource<any>();
  matPaginator = viewChild(MatPaginator);
  matSort = viewChild(MatSort);
  totalRecords = signal(0);
  pageSize = signal(10);
  filtros: { cuenta: string; periodo: Date | null } = {
    cuenta: '',
    periodo: null
  };

  constructor() {
    this.dataSource.data = [
      { numeroCuenta: '000123456789', cci: '002-123-000123456789-01', moneda: 'SOLES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '120,000.00', saldoContable: '10,000.00' },
      { numeroCuenta: '000123456789', cci: '002-123-000123456789-01', moneda: 'SOLES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '120,000.00', saldoContable: '10,000.00' },
      { numeroCuenta: '000123456789', cci: '002-123-000123456789-01', moneda: 'SOLES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '120,000.00', saldoContable: '10,000.00' },
      { numeroCuenta: '000123456789', cci: '002-123-000123456789-01', moneda: 'SOLES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '120,000.00', saldoContable: '10,000.00' },
      { numeroCuenta: '000123456789', cci: '002-123-000123456789-01', moneda: 'SOLES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '120,000.00', saldoContable: '10,000.00' },
      { numeroCuenta: '120123456789', cci: '002-123-120123456789-01', moneda: 'DÓLARES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '80,000.00', saldoContable: '5,000.00' },
      { numeroCuenta: '120123456789', cci: '002-123-120123456789-01', moneda: 'DÓLARES', razonSocial: 'CUENTA EMPRESA', saldoDisponible: '80,000.00', saldoContable: '5,000.00' },
    ];
    this.totalRecords.set(this.dataSource.data.length);
  }

  ngAfterViewInit() {
    if (this.matPaginator()) this.dataSource.paginator = this.matPaginator()!;
    if (this.matSort()) this.dataSource.sort = this.matSort()!;
  }
  buscar() {
    console.log('Buscar presionado');
  }

  limpiarFiltros() {
    this.filtros.cuenta = '';
    this.filtros.periodo = null;
  }
  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Date>) {

    const ctrlValue = this.filtros.periodo || new Date();
    ctrlValue.setMonth(normalizedMonthAndYear.getMonth());
    ctrlValue.setFullYear(normalizedMonthAndYear.getFullYear());
    this.filtros.periodo = new Date(ctrlValue);
    datepicker.close();
  }
}
export default AccountStatusReport;
