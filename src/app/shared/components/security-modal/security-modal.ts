import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Alert } from '../alert/alert';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SecurityModalConfig {
  confirmTransfer$: (transferId: string, credentials: any) => Observable<any>;
  transferId: string;
}

@Component({
  selector: 'app-security-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './security-modal.html',
  styleUrl: './security-modal.css',
})
export class SecurityModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<SecurityModal>);
  readonly config = inject<SecurityModalConfig>(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);
  readonly isSubmitting = signal(false);

  hidePassword = signal(true);
  hideToken = signal(true);
  securityKeyTouched = signal(false);
  digitalTokenTouched = signal(false);


  securityForm = this.fb.group({
    securityKey: ['', [Validators.required]],
    digitalToken: ['', [Validators.required]],
  });

  togglePasswordVisibility() {
    this.hidePassword.update((value) => !value);
  }

  toggleTokenVisibility() {
    this.hideToken.update((value) => !value);
  }

  async onConfirm() {
    if (this.securityForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.dialogRef.disableClose = true;
      try {
        const response = await firstValueFrom(
          this.config.confirmTransfer$(
            this.config.transferId, {
            password: this.securityForm.get('securityKey')?.value!,
            otpCode: this.securityForm.get('digitalToken')?.value!
          }
          )
        );
        if (response?.success) {
          this.dialogRef.close({
            success: true,
            message: response.message || 'Operación completada exitosamente',
            data: response.data,
          });

        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: response.message || 'Error al confirmar la operación', type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      } catch (error: any) {
        this._snackBar.openFromComponent(Alert, {
          data: { message: error.message || 'Error al confirmar la operación, intentelo mas tarde', type: 'error' },
          panelClass: [`alert-error`]
        });
      } finally {
        this.isSubmitting.set(false);
        this.dialogRef.disableClose = false;
      }
    }
  }

}
