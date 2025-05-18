import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Payment, PaymentStatus } from '@/types/payment';
import Colors from '@/constants/Colors';
import { CircleArrowDown as ArrowDownCircle, CircleArrowUp as ArrowUpCircle } from 'lucide-react-native';

interface PaymentSummaryProps {
  payments: Payment[];
}

export default function PaymentSummary({ payments }: PaymentSummaryProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Calculate summary metrics
  const totalPaid = payments
    .filter(p => p.status === PaymentStatus.PAID)
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalUpcoming = payments
    .filter(p => p.status === PaymentStatus.UPCOMING)
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalOverdue = payments
    .filter(p => p.status === PaymentStatus.OVERDUE)
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.label, { color: colors.muted }]}>Total Paid</Text>
          <View style={styles.amountContainer}>
            <ArrowUpCircle size={20} color={colors.success} />
            <Text style={[styles.amount, { color: colors.text }]}>
              ${totalPaid.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.column}>
          <Text style={[styles.label, { color: colors.muted }]}>Upcoming</Text>
          <View style={styles.amountContainer}>
            <ArrowDownCircle size={20} color={colors.warning} />
            <Text style={[styles.amount, { color: colors.text }]}>
              ${totalUpcoming.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <View style={styles.column}>
          <Text style={[styles.label, { color: colors.muted }]}>Overdue</Text>
          <View style={styles.amountContainer}>
            <ArrowDownCircle size={20} color={colors.error} />
            <Text style={[styles.amount, { color: colors.text }]}>
              ${totalOverdue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 6,
  }
});