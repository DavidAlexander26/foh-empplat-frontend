import { Component, inject, signal, viewChild } from '@angular/core';
import { FohCol } from '../../../../shared/layouts/foh-col/foh-col';
import { FohGrid } from '../../../../shared/layouts/foh-grid/foh-grid';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { ReportBatch } from '../../components/report-batch/report-batch';
import { ReportAccount } from '../../components/report-account/report-account';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-report-history',
  imports: [
    FohCol,
    FohGrid,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    BackButton,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    ReportBatch,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReportAccount
  ],
  templateUrl: './report-history.html',
  styleUrl: './report-history.css',
})
export class ReportHistory {
  today = new Date();
  selectedView=signal<'batches' | 'accounts'>('batches');

  setView(view: 'batches' | 'accounts') {
    this.selectedView.set(view);
  }

  batchFilters = {
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
  };

  accountFilters = {
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
    dniFilter: '',
  };

  // Limpiar filtros (batches)
  clearBatchFilters() {
    this.batchFilters = {
      fechaInicio: null,
      fechaFin: null
    };
  }

  // Limpiar filtros (accounts)
  clearAccountFilters() {
    this.accountFilters = {
      fechaInicio: null,
      fechaFin: null,
      dniFilter: ''
    };
  }

  // Buscar TODO
  buscarLotes() {
    console.log('Filtros Lotes:', this.batchFilters);
  }

  buscarCuentas() {
    console.log('Filtros Cuentas:', this.accountFilters);
  }

}

export default ReportHistory
