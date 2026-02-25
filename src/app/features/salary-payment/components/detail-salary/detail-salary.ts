import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { firstValueFrom, Observable } from 'rxjs';

export interface DetailModalConfig {
  getDetail$: Observable<any>
}

@Component({
  selector: 'app-detail-salary',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './detail-salary.html',
  styleUrl: './detail-salary.css',
})
export class DetailSalary {
  private dialogRef = inject(MatDialogRef<DetailSalary>);
  readonly config = inject<DetailModalConfig>(MAT_DIALOG_DATA);
  isLoading = signal(true);
  detailData = signal<any>(null);

 transferencia = {
    idLote: '101',
    nombreLote: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    fechadeCreacion: '10/10/2020',
    monto: '500.00',
    moneda: 'SOLES',
    numeroLineas: '100',
    estado: 'PENDIENTE'
  };

  aprobadores = [
    {
      nombre: 'Juan Gonzales',
      observacion: 'Pendiente de aprobar',
      estado: 'PENDIENTE'
    },
    {
      nombre: 'Pedro Gomez',
      observacion: 'Pendiente de aprobar',
      estado: 'PENDIENTE'
    }
  ];

  displayedColumns: string[] = ['nombre', 'observacion', 'estado'];
  constructor() {
    this.prepare()
  }

  async prepare() {
    this.isLoading.set(true)
    try {
      const response = await firstValueFrom(this.config.getDetail$)
      console.log({response})
      if (response?.success) {
        this.detailData.set(response.data)
      } else {
        this.dialogRef.close({
          success: false,
          message: response?.message || 'Error al mostrar el detalle',
        });
      }
    } catch (error: any) {
      this.dialogRef.close({
        success: false,
        message: error.message || 'Error al mostrar el detalle',
      });
    } finally {
      this.isLoading.set(false)
    }
  }

}
