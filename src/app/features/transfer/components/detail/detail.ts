import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { firstValueFrom, Observable, of } from 'rxjs';
import { DetailTransferResponse, TransferDetail } from '../../interfaces/transfer.model';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-pipe';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApprovalService } from '../../../approvals/service/approval.service';

export interface DetailModalConfig {
  getDetail$: Observable<DetailTransferResponse>
}
interface Aprobador {
  nombre: string;
  observacion: string;
  estado: string;
}
@Component({
  selector: 'app-detail',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CurrencyFormatPipe,
    MatChipsModule,
    MatDividerModule,
    DateFormatPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  private dialogRef = inject(MatDialogRef<Detail>);
  readonly config = inject<DetailModalConfig>(MAT_DIALOG_DATA);
  private approvalService = inject(ApprovalService);
  isLoading = signal(true)
  detailData = signal<TransferDetail | null>(null)

  private correlationId = signal<string | null>(null);

  approvalsResource = rxResource({
    params: () => ({ id: this.correlationId() }),
    stream: ({ params }) => {
      if (!params.id) {
        return of(null);
      }
      return this.approvalService.getApprovalsByOperation(params.id)
    }
  });


  displayedColumns: string[] = ['nombre', 'estado'];
  constructor() {
    this.prepare()
  }

  async prepare() {
    this.isLoading.set(true)
    try {
      const response = await firstValueFrom(this.config.getDetail$)
      console.log('DETAIL RESPONSE:', response.data);
    console.log('CORRELATION ID:', response.data?.correlationId);
      if (response.data.correlationId) {
        this.correlationId.set(response.data.correlationId);
      }
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
