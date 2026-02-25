import { Component, signal, computed, inject, linkedSignal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChip } from '@angular/material/chips';
import { ChipNotification } from "../chip-notification/chip-notification";
import { ApprovalService } from '../../../features/approvals/service/approval.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { OperationTypePipe } from '../../pipes/operation-type-pipe';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '../alert/alert';
import { Operation } from '../../../features/approvals/interfaces/approval.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-notification-popup',
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    //MatChip,
    MatProgressSpinnerModule,
    DateFormatPipe,
    OperationTypePipe,
    ChipNotification
  ],
  templateUrl: './notification-popup.html',
  styleUrl: './notification-popup.scss',
})
export class NotificationPopup {

  private approvalService = inject(ApprovalService);

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  pendingCache = signal<Operation[]>([]);
  approvedCache = signal<Operation[]>([]);



  approvedOperationsResource = rxResource({
    params: () => 'APPROVED',
    stream: ({ params }) =>
      this.approvalService.getOperationsByState(params, 1, 20).pipe(
        tap({
          next: ({ data: { operations } }) => {
            this.approvedCache.set(operations);
          }
        })
      )
  });

  pendingOperationsResource = rxResource({
    params: () => 'PENDING',
    stream: ({ params }) =>
      this.approvalService.getOperationsByState(params, 1, 20).pipe(
        tap({
          next: ({ data: { operations } }) => {
            this.pendingCache.set(operations);
          }
        })
      )
  });


  onTabChange(index: number) {
    const state = index === 0 ? 'PENDING' : 'APPROVED';
    if (state === 'PENDING') {
      this.pendingOperationsResource.reload();
    } else {
      this.approvedOperationsResource.reload();
    }
  }


  approveOperation(operation: Operation) {
    console.log('asdasd')
    const securityModalRef = this.dialog.open(ConfirmModal, {
      disableClose: true,
      width: "100%",
      maxWidth: "534px",
      data: {
        executeAction$: this.approvalService.signOperation(operation.operationId, {
          action: 'APPROVE',
          // approverUserId: this.store.userId(),
          approverUserId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
          operationTarget: operation.operationType.includes("PAYROLL") ? "PAYROLL" : "TRANSFER",

        }),
        action: 'Aprobar',
        alertMessage: operation.operationType.includes("PAYROLL") ? '¿Está seguro de aprobar el pago de haber seleccionado?' : '¿Está seguro de aprobar la transferencia seleccionada?',
        successMessage: operation.operationType.includes("PAYROLL") ? 'Pago de haber aprobado exitosamente' : 'Transferencia aprobada exitosamente',
        errorMessage: 'Error al aprobar la operación',
      },
    });

    securityModalRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.success) {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'success' },
            panelClass: [`alert-success`]
          })
          this.approvedOperationsResource.reload();
          this.pendingOperationsResource.reload();
        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      }
    });

  }

  rejectOperation(operation: Operation) {
    const securityModalRef = this.dialog.open(ConfirmModal, {
      disableClose: true,
      width: "100%",
      maxWidth: "534px",
      data: {
        executeAction$: this.approvalService.signOperation(operation.operationId, {
          action: 'REJECT',
          // approverUserId: this.store.userId(),
          approverUserId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
          operationTarget: operation.operationType.includes("PAYROLL") ? "PAYROLL" : "TRANSFER",

        }),
        action: 'Rechazar',
        alertMessage: operation.operationType.includes("PAYROLL") ? '¿Está seguro de rechazar el pago de haber seleccionado?' : '¿Está seguro de rechazar la transferencia seleccionada?',
        successMessage: operation.operationType.includes("PAYROLL") ? 'Pago de haber rechazado exitosamente' : 'Transferencia rechazada exitosamente',
        errorMessage: 'Error al rechazar la operación',
      },
    });

    securityModalRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.success) {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'success' },
            panelClass: [`alert-success`]
          })
          this.approvedOperationsResource.reload();
          this.pendingOperationsResource.reload();
        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      }
    });


  }


}
