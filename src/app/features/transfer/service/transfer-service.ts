import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { delay, Observable } from 'rxjs';
import {
  AccountResponse,
  ConfirmTransferRequest,
  CreateTransferRequest,
  CreateTransferResponse,
  DestinationAccountResponse,
  DetailTransferResponse,
  FrequenOperationsResponse,
  TransferConfigResponse,
  TransferHistoryFilters,
  TransferHistoryResponse,
  TransferResponse,
} from '../interfaces/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private readonly http = inject(HttpClient);
  private readonly apiUrlTransfer = environment.apiTransferUrl + "/v1/transfers";
  private readonly apiUrlFrequentOperation = environment.apiTransferUrl + "/v1/frequent-operations";

  getAccounts(): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.apiUrlTransfer}/accounts`);
  }

  getTransferChannelConfiguration(): Observable<TransferConfigResponse> {
    return this.http.get<TransferConfigResponse>(`${this.apiUrlTransfer}/channels/limits`);
  }

  getDestinationAccount(
    accountNumber: string,
    bankCode?: string
  ): Observable<DestinationAccountResponse> {
    let params = new HttpParams().set('accountNumber', accountNumber);
    return this.http.get<DestinationAccountResponse>(
      `${this.apiUrlTransfer}/account/info`,
      { params }
    );
  }

  validateAndCreateDraftTransfer(
    body: CreateTransferRequest
  ): Observable<CreateTransferResponse> {
    return this.http.post<CreateTransferResponse>(
      `${this.apiUrlTransfer}`,
      body)
      .pipe(
        delay(200)
      )
      ;
  }

  confirmTransfer(
    transferId: string,
    body: ConfirmTransferRequest
  ): Observable<TransferResponse> {
    return this.http.post<TransferResponse>(
      `${this.apiUrlTransfer}/${transferId}/confirm`,
      body).pipe(
        delay(4000)
      );
  }

  getTransferHistory(filters?: TransferHistoryFilters): Observable<TransferHistoryResponse> {
    let params = new HttpParams();

    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.startDate) params = params.set('startDate', filters.startDate);
    if (filters?.endDate) params = params.set('endDate', filters.endDate);
    if (filters?.page != undefined) params = params.set('page', filters.page.toString());
    if (filters?.size != undefined) params = params.set('size', filters.size.toString());

    return this.http
      .get<TransferHistoryResponse>(`${this.apiUrlTransfer}/history`, {params})
      .pipe(delay(100));
  }

  getDetailTransfer(transferId: string): Observable<DetailTransferResponse> {
    return this.http
      .get<DetailTransferResponse>(`${this.apiUrlTransfer}/${transferId}`)
  }

  deleteFrequentOperations(frequentId: string) {
    return this.http.delete(`${this.apiUrlFrequentOperation}/${frequentId}`)
  }

  frequentOperations(): Observable<FrequenOperationsResponse> {
    return this.http
      .get<FrequenOperationsResponse>(`${this.apiUrlFrequentOperation}`)
  }
}
