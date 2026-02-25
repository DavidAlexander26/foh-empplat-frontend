export interface AccountResponse {
  success: boolean;
  message: string;
  data: Account[];
}

export interface Account {
  accountId: string;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'CREDIT';
  currency: 'PEN' | 'USD';
  availableBalance: number;
  cci: string;
  isDefault: boolean;
}

export interface TransferConfigResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  transferTypes: TransferType[];
  amountRanges: AmountRange[];
}

export interface AmountRange {
  limits: {
    [key: string]: {
      min: number;
      max: number | null;
    };
  };
  availableTypes: AvailableType[];
}

export interface AvailableType {
  id: string;
  commission: {
    [key: string]: number;
  };
}

export type TransferType = {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface DestinationAccountResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  accountNumber: string;
  accountType: string;
  currency: string;
  holderName: string;
  holderDocumentType: string;
  holderDocumentNumber: string;
}


export interface CreateTransferResponse {
  success: true;
  message: string;
  data: {
    transferId: string;
    transferNumber: string;
    sourceAccountNumber: string;
    destinationCCI: string;
    beneficiaryName: string;
    status: string;
    requiresApproval: boolean;
    approvalOperationId: string;
    approvalLevelsRequired: number;
    amount: number;
    currency: string;
    commission: number;
    totalAmount: number;
    createdAt: string;
    confirmedAt: string;
  };
  errors?: Array<{
    code: string;
    message: string;
    field?: string;
    details?: {
      availableBalance?: number;
      requiredAmount?: number;
    };
  }>;
}

export interface CreateTransferErrorResponse {
  success: false;
  message: string;

}

export interface CreateTransferRequest {
  sourceAccountNumber: string;
  destinationCCI: string;
  type: string;
  beneficiaryName: string;
  beneficiaryDocumentType: string;
  beneficiaryDocumentNumber: string;
  amount: number;
  commission: number;
  priority: string
  currency: string;
  description: string;
  scheduledDate: string;
  saveAsFrequent: boolean;
  frequentAlias: string;
}

export interface ConfirmTransferRequest {
  password: string;
  otpCode: string;
}

export interface TransferSuccessResponse {
  success: true;
  message: string;
  data: {
    transferId: string;
    transferNumber: string;
    sourceAccountNumber: string;
    destinationCCI: string;
    beneficiaryName: string;
    status: string;
    requiresApproval: boolean;
    approvalOperationId: string;
    approvalLevelsRequired: number;
    amount: number;
    currency: string;
    commission: number;
    totalAmount: number;
    createdAt: string;
    confirmedAt: string;
  };
}

export interface TransferErrorResponse {
  success: false;
  message: string;
  errors: Array<{
    code: string;
    message: string;
    field?: string;
    details?: {
      availableBalance?: number;
      requiredAmount?: number;
    };
  }>;
}

export type TransferResponse = TransferSuccessResponse | TransferErrorResponse;


export interface TransferHistoryResponse {
  success: boolean;
  message: string;
  data: TransferHistoryItem[];
  pagination: TransferPagination;
}

export interface TransferHistoryItem {
  createdDate: string;
  description: string;
  sourceAccount: {
    accountNumber: string;
    accountType: string;
    cci: string;
  };
  destinationAccount: {
    accountNumber: string;
    cci: string;
    bankName: string;
    bankCode: string;
    beneficiaryName: string;
  };
  amount: number;
  currency: string;
  status: string;
}

export interface TransferPagination {
  page: number;
  size: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface TransferHistoryFilters {
  status?: string;
  startDate?: string; // formato ISO 8601
  endDate?: string;   // formato ISO 8601
  page?: number;
  size?: number;
}


export interface DetailTransferResponse {
  success: boolean;
  message: string;
  data: TransferDetail;
}

export interface TransferDetail {
  fohTransferId: string;
  fohRequestNumber: string;
  transferId: string;
  type: string;
  transferNumber: string;
  amount: number;
  currency: string;
  sourceAccount: SourceAccount;
  destinationAccount: DestinationAccount;
  status: string;
  description: string;
  scheduledDate: Date;
  submittedAt: Date;
  sentAt: Date;
  confirmedAt: Date;
  completedAt: Date;
  approvalOperationId: string;
  approvalLevelsRequired: number;
  commission: number;
  totalAmount: number;
  correlationId: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export interface DestinationAccount {
  accountNumber: string;
  cci: string;
  beneficiaryName: string;
}

export interface SourceAccount {
  accountNumber: string;
}


export interface FrequenOperationsResponse {
  success: boolean;
  message: string;
  data: FrequentOperation[];
  pagination: Pagination;
}

export interface FrequentOperation {
  createdBy: string;
  createdAt: Date;
  frequentOperationId: string;
  sourceAccountNumber: string;
  userId: string;
  currency: string;
  priority: string;
  recipientType: string;
  operationName: string;
  description: string;
  isActive: boolean;
  recipientAccountNumber?: string;
  recipientCci: string;
  recipientName: string;
  expiresAt?: Date;
  companyRuc?: string;
  commissionAmount: number;
  amount: number;
  recipientDocumentType: string;
  recipientDocumentNumber: string;
  totalAmount: number;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
  pages: number;
}
