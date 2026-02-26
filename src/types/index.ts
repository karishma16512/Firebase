export interface User {
  id: string;
  name: string;
  email: string;
  role: 'individual' | 'sme' | 'admin';
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface Income {
  _id: string;
  sourceType: 'salary' | 'business' | 'capital_gains' | 'rental' | 'other';
  amount: number;
  description?: string;
  financialYear: string;
  proofDocument?: string;
  createdAt: string;
}

export interface Deduction {
  _id: string;
  sectionType: '80C' | '80D' | '80E' | '80G' | '80TTA' | '80TTB' | 'other';
  amount: number;
  description?: string;
  financialYear: string;
  proofDocument?: string;
  createdAt: string;
}

export interface GST {
  _id: string;
  gstin: string;
  outwardSupplies: number;
  inwardSupplies: number;
  gstPayable: number;
  returnStatus: 'pending' | 'filed' | 'approved' | 'rejected';
  returnPeriod: string;
  financialYear: string;
  filedDate?: string;
  createdAt: string;
}

export interface TaxReturn {
  _id: string;
  financialYear: string;
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  estimatedTax: number;
  taxPaid: number;
  refundAmount: number;
  filingStatus: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
  filedDate?: string;
  acknowledgementNumber?: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  estimatedTax: number;
  gstPayable: number;
  refundEstimate: number;
  filingStatus: string;
  financialYear: string;
}

export interface ChartData {
  incomeBySource: Array<{ sourceType: string; amount: number }>;
  deductionsBySection: Array<{ section: string; amount: number }>;
  monthlyIncome: Array<{ month: number; amount: number }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: null | string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
