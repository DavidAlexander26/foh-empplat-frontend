import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, Observable } from 'rxjs';
import { Alert } from '../alert/alert';


export interface ConfirmModalConfig {
  executeAction$: Observable<any>;
  action: string;
  alertMessage: string;
  successMessage: string;
  errorMessage: string;
}

@Component({
  selector: 'app-confirm-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ConfirmModal>);
  readonly config = inject<ConfirmModalConfig>(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);
  readonly isSubmitting = signal(false);

  alertMessage = signal('');
  action = signal('');

  constructor() {
    this.alertMessage.set(this.config.alertMessage);
    this.action.set(this.config.action);
  }

  async onConfirm() {
    if (!this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.dialogRef.disableClose = true;
      try {
        const response = await firstValueFrom(
          this.config.executeAction$
        );
        if (response?.success) {
          this.dialogRef.close({
            success: true,
            message: response.message || this.config.successMessage,
            data: response.data,
          });

        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: response.message || this.config.errorMessage, type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      } catch (error: any) {
        this._snackBar.openFromComponent(Alert, {
          data: { message: error.message || this.config.errorMessage, type: 'error' },
          panelClass: [`alert-error`]
        });
      } finally {
        this.isSubmitting.set(false);
        this.dialogRef.disableClose = false;
      }
    }
  }
}
