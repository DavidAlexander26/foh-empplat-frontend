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
import { PaymentTable } from '../../components/payment-table/payment-table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-report-payment',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    PaymentTable,
    MatSelectModule
  ],
  templateUrl: './report-payment.html',
  styleUrl: './report-payment.css',
})
export class ReportPayment {
  today = new Date();
  dateFilter = {
    start: null as Date | null,
    end: null as Date | null,
  };
  statusFilter= '';
  batchFilter= '';
  dniFilter= '';

  // Limpiar filtros (batches)
  clearFilters() {
    this.dateFilter = { start: null, end: null };
    this.statusFilter = '';
    this.batchFilter = '';
    this.dniFilter = '';
  }

  // Buscar TODO
  search() {
    console.log('Fecha Inicio:', this.dateFilter.start);
    console.log('Fecha Fin:', this.dateFilter.end);
    console.log('Otros filtros:', this.statusFilter, this.batchFilter, this.dniFilter);
  }

  exportToPDF() {
    console.log('TODO');
  }

  exportToExcel() {
    console.log('TODO');
  }
}

export default ReportPayment;
