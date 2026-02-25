import { Component, inject, signal, viewChild } from "@angular/core";
import { FohCol } from "../../../../shared/layouts/foh-col/foh-col";
import { FohGrid } from "../../../../shared/layouts/foh-grid/foh-grid";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BackButton } from "../../../../shared/components/back-button/back-button";
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-report-account',
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
    MatMenuModule
  ],

  templateUrl: './report-account.html',
  styleUrl: './report-account.css',
})
export class ReportAccount {
  matSort = viewChild(MatSort);
  matPaginator = viewChild(MatPaginator);
  page = signal(0);
  size = signal(25);
  totalRecords = signal(0);
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'tipoDocumento',
    'numeroDocumento',
    'apellidoPaterno',
    'apellidoMaterno',
    'nombre',
    'fechaApertura',
    'numeroCuenta',
  ];
  dataSource = new MatTableDataSource<any>();

  readonly dialog = inject(MatDialog);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);


  constructor(){
    this.dataSource.data = [
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
      {tipoDocumento: 'DNI',numeroDocumento: '87654321', apellidoPaterno: 'Rodriguez',apellidoMaterno: 'Mendoza', nombre:'Roberto',fechaApertura:'15/10/2023',numeroCuenta:'000-123456789'},
    ];
    //Actualización del total para páginas
    this.totalRecords.set(this.dataSource.data.length);
  }
  //Manejo del cambio de página con vista renderizada
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator();
    this.dataSource.sort = this.matSort();
  }
}
