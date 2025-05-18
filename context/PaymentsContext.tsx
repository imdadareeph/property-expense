import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Payment, PaymentStatus, PaymentType, PaymentMode } from '@/types/payment';

interface PaymentsContextType {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePayment: (payment: Payment) => void;
  deletePayment: (id: string) => void;
  getPaymentsByProperty: (propertyId: string) => Payment[];
  getPaymentsByStatus: (status: PaymentStatus) => Payment[];
  getPaymentsByMonth: (month: number, year: number) => Payment[];
  getTotalExpenses: () => number;
  getUpcomingPayments: () => Payment[];
  loading: boolean;
}

const PaymentsContext = createContext<PaymentsContextType>({
  payments: [],
  addPayment: () => {},
  updatePayment: () => {},
  deletePayment: () => {},
  getPaymentsByProperty: () => [],
  getPaymentsByStatus: () => [],
  getPaymentsByMonth: () => [],
  getTotalExpenses: () => 0,
  getUpcomingPayments: () => [],
  loading: true,
});

// Sample data for initial app state
const initialPayments: Payment[] = [
  {
    id: '1',
    propertyId: '1',
    amount: 2500,
    type: PaymentType.RENT,
    date: new Date('2023-08-15').toISOString(),
    status: PaymentStatus.PAID,
    mode: PaymentMode.BANK_TRANSFER,
    description: 'August Rent',
    receiptUrl: '',
    isRecurring: true,
    recurringDay: 15,
  },
  {
    id: '2',
    propertyId: '1',
    amount: 150,
    type: PaymentType.MAINTENANCE,
    date: new Date('2023-08-20').toISOString(),
    status: PaymentStatus.PAID,
    mode: PaymentMode.CASH,
    description: 'Plumbing Repair',
    receiptUrl: '',
    isRecurring: false,
  },
  {
    id: '3',
    propertyId: '2',
    amount: 2800,
    type: PaymentType.EMI,
    date: new Date('2023-08-10').toISOString(),
    status: PaymentStatus.PAID,
    mode: PaymentMode.BANK_TRANSFER,
    description: 'August EMI',
    receiptUrl: '',
    isRecurring: true,
    recurringDay: 10,
  },
  {
    id: '4',
    propertyId: '2',
    amount: 350,
    type: PaymentType.UTILITY,
    date: new Date('2023-08-28').toISOString(),
    status: PaymentStatus.UPCOMING,
    mode: PaymentMode.UPI,
    description: 'Electricity Bill',
    receiptUrl: '',
    isRecurring: true,
    recurringDay: 28,
  },
  {
    id: '5',
    propertyId: '3',
    amount: 40000,
    type: PaymentType.MILESTONE,
    date: new Date('2023-10-15').toISOString(),
    status: PaymentStatus.UPCOMING,
    mode: PaymentMode.BANK_TRANSFER,
    description: 'Construction Milestone Payment',
    receiptUrl: '',
    isRecurring: false,
  }
];

export const PaymentsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const storedPayments = await AsyncStorage.getItem('payments');
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      } else {
        // Use sample data if no stored payments
        setPayments(initialPayments);
        await AsyncStorage.setItem('payments', JSON.stringify(initialPayments));
      }
    } catch (error) {
      console.error('Failed to load payments:', error);
      // Fall back to sample data on error
      setPayments(initialPayments);
    } finally {
      setLoading(false);
    }
  };

  const savePayments = async (updatedPayments: Payment[]) => {
    try {
      await AsyncStorage.setItem('payments', JSON.stringify(updatedPayments));
    } catch (error) {
      console.error('Failed to save payments:', error);
    }
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
    };
    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);
    savePayments(updatedPayments);
  };

  const updatePayment = (payment: Payment) => {
    const updatedPayments = payments.map(p => 
      p.id === payment.id ? payment : p
    );
    setPayments(updatedPayments);
    savePayments(updatedPayments);
  };

  const deletePayment = (id: string) => {
    const updatedPayments = payments.filter(p => p.id !== id);
    setPayments(updatedPayments);
    savePayments(updatedPayments);
  };

  const getPaymentsByProperty = (propertyId: string) => {
    return payments.filter(p => p.propertyId === propertyId);
  };

  const getPaymentsByStatus = (status: PaymentStatus) => {
    return payments.filter(p => p.status === status);
  };

  const getPaymentsByMonth = (month: number, year: number) => {
    return payments.filter(p => {
      const paymentDate = new Date(p.date);
      return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
    });
  };

  const getTotalExpenses = () => {
    return payments.reduce((total, current) => {
      if (current.status === PaymentStatus.PAID) {
        return total + current.amount;
      }
      return total;
    }, 0);
  };

  const getUpcomingPayments = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    return payments.filter(p => {
      const paymentDate = new Date(p.date);
      return (
        p.status === PaymentStatus.UPCOMING && 
        paymentDate >= today && 
        paymentDate <= thirtyDaysFromNow
      );
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <PaymentsContext.Provider 
      value={{ 
        payments, 
        addPayment, 
        updatePayment, 
        deletePayment, 
        getPaymentsByProperty,
        getPaymentsByStatus,
        getPaymentsByMonth,
        getTotalExpenses,
        getUpcomingPayments,
        loading
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => useContext(PaymentsContext);