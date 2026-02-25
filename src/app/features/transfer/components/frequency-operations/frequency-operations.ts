import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FrequentOperation, FrequenOperationsResponse } from '../../interfaces/transfer.model';
import { FrequentOperationStore } from '../../store/frequent.store';
import { DeleteFrequentOperation } from '../delete-frequent-operation/delete-frequent-operation';
import { TransferService } from '../../service/transfer-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '../../../../shared/components/alert/alert';

export interface OperacionesFrecuentesConfig {
  getOperations$?: Observable<FrequenOperationsResponse>;
}


@Component({
  selector: 'app-frequency-operations',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRadioModule,
  ],
  templateUrl: './frequency-operations.html',
  styleUrl: './frequency-operations.css',
})
export class FrequencyOperations {
  private _snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<FrequencyOperations>);
  private frequentStore = inject(FrequentOperationStore)
  private transferService = inject(TransferService)
  readonly dialog = inject(MatDialog);
  readonly config = inject<OperacionesFrecuentesConfig>(MAT_DIALOG_DATA);
  isLoading = signal(false);
  selectedOperationId: string | null = null;

  frequentOperations = signal<FrequentOperation[]>([])

  constructor() {
    this.prepare();
  }

  async prepare() {
    this.isLoading.set(true);
    try {
      await this.loadFrequentOperations() 
    } catch (error: any) {
      this.dialogRef.close({
        success: false,
        message: error.message || 'Error al cargar operaciones frecuentes',
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadFrequentOperations() {
    this.frequentStore.clean()
    const response = await firstValueFrom(this.config.getOperations$!);
    if (response?.success) {
      this.frequentOperations.set(response.data)
    }
  }

  deleteOperation(event: Event, frequent: FrequentOperation) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Eliminar operación:', frequent);

    const delDialog = this.dialog.open(DeleteFrequentOperation, {
      width:'100%',
      maxWidth:'470.5px',
      data: {
        deleteOperation$: this.transferService.deleteFrequentOperations(frequent.frequentOperationId)
        .pipe(
          tap(() => {
            this.loadFrequentOperations();
          })
        )
      }
    });

    delDialog.afterClosed().subscribe((result) => {
      if (result) {
        if (result.success) {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'success' },
            panelClass: [`alert-success`],
            duration: 2500
          })
        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      }
    })
  }

  continuar() {
    const selectedOperation = this.frequentOperations().find(op => op.frequentOperationId === this.selectedOperationId);
    if (selectedOperation) {
      this.frequentStore.seletecFrequent(selectedOperation)
      this.dialogRef.close({
        success: true,
        data: selectedOperation
      });
    }
  }
}
