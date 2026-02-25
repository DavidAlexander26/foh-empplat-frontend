import { afterNextRender, Component, effect, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FohCol } from '../../../../shared/layouts/foh-col/foh-col';
import { FohGrid } from '../../../../shared/layouts/foh-grid/foh-grid';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { TransferService } from '../../service/transfer-service';
import { TransferHistoryItem } from '../../interfaces/transfer.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Detail } from '../../components/detail/detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '../../../../shared/components/alert/alert';
import { FrequencyOperations } from '../../components/frequency-operations/frequency-operations';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { CurrencyMask } from '../../../../shared/directives/currency-mask';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-pipe';

@Component({
  selector: 'app-transfer-history',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FohCol,
    FohGrid,
    MatIconModule,
    MatProgressSpinnerModule,
    BackButton,
    MatCardModule,
    RouterLink,
    MatTableModule,
    MatChipsModule,
    CurrencyFormatPipe,
    MatSortModule,
    MatPaginatorModule,
    DateFormatPipe,
  ],
  templateUrl: './transfer-history.html',
  styleUrl: './transfer.scss',
})
export class TransferHistory {
  matSort = viewChild(MatSort);
  matPaginator = viewChild(MatPaginator);
  readonly dialog = inject(MatDialog);
  private transferService = inject(TransferService);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  dataSource = new MatTableDataSource<TransferHistoryItem>();
  page = signal(0);
  size = signal(20);
  totalRecords = signal(0);
  pageSizeOptions = [5, 10, 25, 100];

  transferHistoryResource = rxResource({
    params: () => ({
      page: this.page() + 1,
      size: this.size(),
    }),
    stream: ({ params: { page, size } }) =>
      this.transferService.getTransferHistory({
        page,
        size,
      }),
  });

  displayedColumns: string[] = [
    'fechaCreacion',
    'nSolicitud',
    'descripcion',
    'cuentaCargo',
    'cuentaDestino',
    'monto',
    'moneda',
    'estado'
  ];

  constructor() {
    effect(() => {
      const response = this.transferHistoryResource.value();
      if (response?.success && response?.data) {
        this.dataSource.data = response.data;
        if (response.pagination) {
          this.totalRecords.set(response.pagination.total);
        }
        const sort = this.matSort();
        if (sort) {
          this.dataSource.sort = sort;
        }
      }
    });

    afterNextRender(() => {
      const sort = this.matSort();
      const paginator = this.matPaginator();
      if (sort) {
        this.dataSource.sort = sort;

        this.dataSource.sortingDataAccessor = (item: TransferHistoryItem, property: string) => {
          switch (property) {
            case 'fechaCreacion':
              return new Date(item.createdDate).getTime();
            case 'nSolicitud':
              return item.sourceAccount?.accountNumber || '';
            case 'descripcion':
              return item.description || '';
            case 'cuentaCargo':
              return item.sourceAccount?.accountNumber || '';
            case 'cuentaDestino':
              return item.destinationAccount?.accountNumber || '';
            case 'monto':
              return item.amount || '';
            case 'moneda':
              return item.currency || '';
            case 'estado':
              return item.status || '';
            default:
              return '';
          }
        };
      }
      if (paginator) {
        paginator.pageIndex = this.page();
        paginator.pageSize = this.size();
        paginator.length = this.totalRecords();
      }
    });
  }

  announceSortChange(sortState: Sort): void {
    console.log('Ordenado por:', sortState.active, sortState.direction);
  }

  onPageChange(event: PageEvent): void {
    this.page.set(event.pageIndex);
    this.size.set(event.pageSize);
  }

  showDetails(row: any) {
    const dialogRef = this.dialog.open(Detail, {
      width: "100%",
      maxWidth: "951px",
      data: {
        getDetail$: this.transferService.getDetailTransfer(row.transferId)
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.success) {
        } else {
          this._snackBar.openFromComponent(Alert, {
            data: { message: result.message, type: 'error' },
            panelClass: [`alert-error`]
          })
        }
      }
    });

  }

  showFrequencyOperations() {
    const dialogRef = this.dialog.open(FrequencyOperations, {
      width: "100%",
      maxWidth: "797px",
      data: {
        getOperations$: this.transferService.frequentOperations()
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.success) {
          this.router.navigate(['/transferencias/nuevo']);
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

export default TransferHistory;
