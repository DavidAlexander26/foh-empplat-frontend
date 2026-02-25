import { Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';


export interface DeleteFrequentOperationConfig {
  deleteOperation$: Observable<any>;
}

@Component({
  selector: 'app-delete-frequent-operation',
  imports: [MatButtonModule, MatDialogClose],
  templateUrl: './delete-frequent-operation.html',
  styleUrl: './delete-frequent-operation.css',
})
export class DeleteFrequentOperation {
  readonly dialogRef = inject(MatDialogRef<DeleteFrequentOperation>);
  readonly config = inject<DeleteFrequentOperationConfig>(MAT_DIALOG_DATA);
  isLoading = signal(false);
  async deleteOprations() {
    this.dialogRef.disableClose = true
    this.isLoading.set(true);
    try{
      const response = await firstValueFrom(this.config.deleteOperation$!);
      if (response?.success) {
        this.dialogRef.close({
          success: true,
          message: 'Operacion elimado exitosamente',
        });
      } else {
        this.dialogRef.close({
          success: false,
          message: response.message || 'Error al eliminar la operacion',
        });
      }
    }catch(error: any) {
      this.dialogRef.close({
        success: false,
        message: error.message || 'Error al eliminar la operacion',
      });
    }finally{
      this.dialogRef.disableClose = false
      this.isLoading.set(false);
    }
  }
}
