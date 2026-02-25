export interface ApprovalResponse {
    success: boolean;
    message: string;
    data: ApprovalData[];
}

export interface ApprovalData {
    correlationId: string;
    approvalId: string;
    operationId: string;
    operationType: string;
    action: string;
    operationStatus: string;
    approvalLevel: number;
    approvalName: string;
    approvalMail: string;
    signedAt: Date;
    rejectedAt: Date;
    approvalLevelsRequired: number;
    approvedAt: Date;
}


export interface ListOperationsResponse {
    success: boolean;
    message: string;
    data: Data;
}

export interface Data {
    operations: Operation[];
    pagination: Pagination;
}

export interface Operation {
    operationId: string;
    operationName: string;
    operationDate: Date;
    operationType: string;
    status: string;
    currency: string;
    amount: number;
    commision: number;
    sourceAccount: SourceAccount;
    destinationAccount: DestinationAccount;
    approvalLevelsRequired: number;
    currentApprovalLevel: number;
    createdAt: Date;
}

export interface DestinationAccount {
    accountNumber: string;
    beneficiaryName: string;
}

export interface SourceAccount {
    accountNumber: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
