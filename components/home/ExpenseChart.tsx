import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Payment, PaymentType } from '@/types/payment';
import Colors from '@/constants/Colors';

interface ExpenseData {
  type: PaymentType;
  amount: number;
  color: string;
  percentage: number;
}

const { width } = Dimensions.get('window');
const barWidth = width - 64;

interface ExpenseChartProps {
  payments: Payment[];
}

export default function ExpenseChart({ payments }: ExpenseChartProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Calculate expense data by type
  const expensesByType = payments.reduce((acc, payment) => {
    const existingType = acc.find(item => item.type === payment.type);
    
    if (existingType) {
      existingType.amount += payment.amount;
    } else {
      acc.push({
        type: payment.type,
        amount: payment.amount,
        color: getColorForType(payment.type, colorScheme),
        percentage: 0
      });
    }
    
    return acc;
  }, [] as ExpenseData[]);
  
  // Calculate total and percentages
  const total = expensesByType.reduce((sum, item) => sum + item.amount, 0);
  expensesByType.forEach(item => {
    item.percentage = total > 0 ? (item.amount / total) * 100 : 0;
  });
  
  // Sort by amount (descending)
  expensesByType.sort((a, b) => b.amount - a.amount);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.legend}>
        {expensesByType.map(item => (
          <View key={item.type} style={styles.legendItem}>
            <View 
              style={[
                styles.legendColor, 
                { backgroundColor: item.color }
              ]} 
            />
            <Text style={[styles.legendText, { color: colors.text }]}>
              {formatExpenseType(item.type)}
            </Text>
            <Text style={[styles.legendValue, { color: colors.text }]}>
              ${item.amount.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.barContainer}>
          {expensesByType.map((item, index) => (
            <View 
              key={item.type}
              style={[
                styles.bar,
                { 
                  backgroundColor: item.color,
                  width: `${item.percentage}%`,
                  zIndex: expensesByType.length - index
                }
              ]}
            />
          ))}
        </View>
        
        <View style={styles.axisLabels}>
          <Text style={[styles.axisLabel, { color: colors.muted }]}>0%</Text>
          <Text style={[styles.axisLabel, { color: colors.muted }]}>50%</Text>
          <Text style={[styles.axisLabel, { color: colors.muted }]}>100%</Text>
        </View>
      </View>
      
      <View style={styles.totalContainer}>
        <Text style={[styles.totalLabel, { color: colors.muted }]}>
          Total Expenses
        </Text>
        <Text style={[styles.totalValue, { color: colors.text }]}>
          ${total.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

// Helper functions
function getColorForType(type: PaymentType, theme: string | null): string {
  const baseColors = {
    [PaymentType.RENT]: '#3498DB',  // Blue
    [PaymentType.EMI]: '#2ECC71',   // Green
    [PaymentType.MAINTENANCE]: '#E74C3C', // Red
    [PaymentType.TAX]: '#9B59B6',   // Purple
    [PaymentType.UTILITY]: '#F39C12', // Orange
    [PaymentType.SOCIETY_FEE]: '#1ABC9C', // Turquoise
    [PaymentType.MILESTONE]: '#34495E', // Dark blue
    [PaymentType.OTHER]: '#95A5A6'   // Gray
  };
  
  return baseColors[type];
}

function formatExpenseType(type: PaymentType): string {
  switch (type) {
    case PaymentType.RENT:
      return 'Rent';
    case PaymentType.EMI:
      return 'EMI';
    case PaymentType.MAINTENANCE:
      return 'Maintenance';
    case PaymentType.TAX:
      return 'Tax';
    case PaymentType.UTILITY:
      return 'Utility';
    case PaymentType.SOCIETY_FEE:
      return 'Society Fee';
    case PaymentType.MILESTONE:
      return 'Milestone';
    case PaymentType.OTHER:
      return 'Other';
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  legend: {
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  legendValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  chartContainer: {
    marginBottom: 16,
  },
  barContainer: {
    height: 24,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
  axisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  axisLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  }
});