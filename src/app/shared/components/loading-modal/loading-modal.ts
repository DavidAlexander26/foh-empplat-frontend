import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom, Observable } from 'rxjs';

export interface LoadingModalConfig {
  action$: Observable<any>;
  loadingMessage: string
}

@Component({
  selector: 'app-loading-modal',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './loading-modal.html',
  styleUrl: './loading-modal.css',
})
export class LoadingModal {
  private dialogRef = inject(MatDialogRef<LoadingModalConfig>);
  readonly config = inject<LoadingModalConfig>(MAT_DIALOG_DATA);

  constructor() {
    this.prepareAction()
  }

  private async prepareAction() {
    this.dialogRef.disableClose = true;
    try {
      const response = await firstValueFrom(this.config.action$);
      this.dialogRef.close({
        success: response.success,
        message: response?.message || 'Error al preparar la operación',
        data: response.data
      });
    } catch (error: any) {
      this.dialogRef.close({
        success: false,
        message: error.message || 'Error al preparar la operación',
      });
    } finally {
      this.dialogRef.disableClose = false;
    }
  }
}
