import { Component, inject, signal, viewChild } from "@angular/core";
import { FohCol } from "../../../../shared/layouts/foh-col/foh-col";
import { FohGrid } from "../../../../shared/layouts/foh-grid/foh-grid";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-report-batch',
  imports: [
    //FohCol,
    //FohGrid,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    //BackButton,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatChipsModule
  ],
  templateUrl: './report-batch.html',
  styleUrl: './report-batch.css',
})
export class ReportBatch {
  matSort = viewChild(MatSort);
  matPaginator = viewChild(MatPaginator);
  page = signal(0);
  size = signal(25);
  totalRecords = signal(0);
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'numeroLote',
    'fechaCarga',
    'horaCarga',
    'registrosTotal',
    'registrosCompleto',
    'registrosObservado',
    'estado',
    'acciones'
  ];
  dataSource = new MatTableDataSource<any>();

  readonly dialog = inject(MatDialog);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);


  constructor(){
    this.dataSource.data = [
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:4,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:6,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:4,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:3,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:4,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:1,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:3,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:1,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:4,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:5,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:4,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:4,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:2,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
      {numeroLote: 'LOTE-2024-001', fechaCarga: '16/10/2023',horaCarga: '02:30:25 pm', registrosTotal:1,registrosCompleto:2,registrosObservado:2,'estado': 'PENDIENTE'},
    ];
    //Actualización del total para páginas
    this.totalRecords.set(this.dataSource.data.length);
  }
  //Manejo del cambio de página con vista renderizada
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator();
    this.dataSource.sort = this.matSort();
  }
  descargarFila(element: any) {
    console.log('Fila a descargar:', element);
    console.log('TODO: descargar reporte');
  }
  getEstadoClass(estado: string): string {
    return `status-${estado.toLowerCase()}`
  }
}
