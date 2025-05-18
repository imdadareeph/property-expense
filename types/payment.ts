export enum PaymentType {
  RENT = 'rent',
  EMI = 'emi',
  MAINTENANCE = 'maintenance',
  TAX = 'tax',
  UTILITY = 'utility',
  SOCIETY_FEE = 'society_fee',
  MILESTONE = 'milestone',
  OTHER = 'other'
}

export enum PaymentStatus {
  PAID = 'paid',
  UPCOMING = 'upcoming',
  OVERDUE = 'overdue'
}

export enum PaymentMode {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  UPI = 'upi',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CHECK = 'check',
  OTHER = 'other'
}

export interface Payment {
  id: string;
  propertyId: string;
  amount: number;
  type: PaymentType;
  date: string; // ISO String
  status: PaymentStatus;
  mode: PaymentMode;
  description: string;
  receiptUrl: string;
  isRecurring: boolean;
  recurringDay?: number; // Day of month for recurring payments
}