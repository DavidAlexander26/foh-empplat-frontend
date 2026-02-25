import { Component, inject, signal, viewChild } from '@angular/core';
import { FohCol } from '../../../../shared/layouts/foh-col/foh-col';
import { FohGrid } from '../../../../shared/layouts/foh-grid/foh-grid';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailSalary } from '../../components/detail-salary/detail-salary';
import { Alert } from '../../../../shared/components/alert/alert';
import { DeleteSalary } from '../../../../shared/components/delete-salary/delete-salary';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-salary-history',
  imports: [
    RouterLink,
    FohCol,
    FohGrid,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BackButton,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatChipsModule
  ],
  templateUrl: './salary-history.html',
  styleUrl: './salary-history.css',
})
export class SalaryHistory {
  matSort = viewChild(MatSort);
  matPaginator = viewChild(MatPaginator);
  page = signal(0);
  size = signal(20);
  totalRecords = signal(0);
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'idLote',
    'nombreLote',
    'fechadeCreacion',
    'monto',
    'moneda',
    'numeroLineas',
    'estado',
    'accion',
  ];
  dataSource = new MatTableDataSource<any>();

  readonly dialog = inject(MatDialog);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  constructor(){
    this.dataSource.data = [
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
      {idLote: 1, nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing,', fechadeCreacion: '15/10/2023',monto: '500.00', moneda:'SOLES',numeroLineas:'1234567890','estado': 'PENDIENTE'},
    ];
  }

  deleteSlr(data:any){
    console.log("delete",{data})

    const dialogRef = this.dialog.open(DeleteSalary, {
      width: "100%",
      maxWidth: "797px",
      data: {
        // getDetail$: this.transferService.getDetailTransfer(row.transferId)
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.success) {
        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      }
    });

  }
  showDetails(data:any){
    const dialogRef = this.dialog.open(DetailSalary, {
      width: "100%",
      maxWidth: "951px",
      data: {
        // getDetail$: this.transferService.getDetailTransfer(row.transferId)
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (!result.success) {
        this._snackBar.openFromComponent(Alert, {
          data: { message: result.message, type: 'error' },
          panelClass: [`alert-error`]
        })
      }
    });

  }
  getEstadoClass(estado: string): string {
    return `status-${estado.toLowerCase()}`
  }
}

export default SalaryHistory
