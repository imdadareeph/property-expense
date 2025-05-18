export enum PropertyType {
  RENTED = 'rented',
  OWNED = 'owned',
  UNDER_CONSTRUCTION = 'under_construction'
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  size: string;
  type: 'Apartment' | 'Villa' | 'House' | 'Condo' | 'Office' | 'Land' | 'Other';
  propertyType: PropertyType;
  value: number;
  tags: string[];
  images: string[];
  
  // For rented properties
  rentAmount?: number;
  leaseStartDate?: string; // ISO String
  leaseDuration?: number; // months
  nextPaymentDate?: string; // ISO String
  
  // For owned properties
  purchaseDate?: string; // ISO String
  downPayment?: number;
  loanAmount?: number;
  emi?: number;
  nextEmiDate?: string; // ISO String
  
  // For under construction properties
  totalCost?: number;
  paidAmount?: number;
  completionDate?: string; // ISO String
  nextMilestoneDate?: string; // ISO String
  nextMilestoneAmount?: number;
  constructionProgress?: number; // Percentage
}