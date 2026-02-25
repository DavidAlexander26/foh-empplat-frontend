import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';

export interface DeleteConfig {
  deleteOperation$: Observable<any>;
}

@Component({
  selector: 'app-delete-salary',
  imports: [MatButtonModule, MatDialogClose],
  templateUrl: './delete-salary.html',
  styleUrl: './delete-salary.css',
})
export class DeleteSalary {
  readonly dialogRef = inject(MatDialogRef<DeleteSalary>);
  readonly config = inject<DeleteConfig>(MAT_DIALOG_DATA);
  isLoading = signal(false);

  async deleteSalary() {
    this.dialogRef.disableClose = true
    this.isLoading.set(true);
    try{
      const response = await firstValueFrom(this.config.deleteOperation$!);
      if (response?.success) {
        this.dialogRef.close({
          success: true,
          message: 'Elimado exitosamente',
        });
      } else {
        this.dialogRef.close({
          success: false,
          message: response.message || 'Error al eliminar',
        });
      }
    }catch(error: any) {
      this.dialogRef.close({
        success: false,
        message: error.message || 'Error al eliminar',
      });
    }finally{
      this.dialogRef.disableClose = false
      this.isLoading.set(false);
    }
  }
}
