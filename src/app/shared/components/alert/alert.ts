import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface AlertData {
  message: string;
  type: 'success' | 'error' | 'warning';
}
@Component({
  selector: 'app-alert',
  imports: [MatIconModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css'
})
export class Alert {
 private snackBarRef = inject(MatSnackBarRef);
  data = inject<AlertData>(MAT_SNACK_BAR_DATA);

  close() {
    this.snackBarRef.dismiss();
  }
    getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }
}
