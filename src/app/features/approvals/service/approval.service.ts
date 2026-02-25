import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ApprovalResponse, ListOperationsResponse } from "../interfaces/approval.interface";



interface RequestSignAction {
    action: string;
    approverUserId: string;
    operationTarget: string
}
@Injectable({
    providedIn: 'root',
})
export class ApprovalService {
    private readonly http = inject(HttpClient);
    private readonly apiApprovalUrl = environment.apiApprovalUrl + "/v1/approvals";

    getApprovalsByOperation(idCorrelation: string): Observable<ApprovalResponse> {
        return this.http.get<ApprovalResponse>(`${this.apiApprovalUrl}/get/${idCorrelation}`);
    }

    getOperationsByState(state: string, page = 1, size = 20): Observable<ListOperationsResponse> {
        return this.http.get<ListOperationsResponse>(`${this.apiApprovalUrl}/operations`, {
            params: {
                status: state,
                page,
                size
            }
        });
    }
    signOperation(operationId: string, requestSignAction: RequestSignAction) {
        return this.http.post(`${this.apiApprovalUrl}/${operationId}/approve`, requestSignAction);
    }
}