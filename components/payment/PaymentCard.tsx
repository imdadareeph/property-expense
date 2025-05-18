import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Payment, PaymentStatus, PaymentType } from '@/types/payment';
import { Property } from '@/types/property';
import Colors from '@/constants/Colors';
import { formatDate } from '@/utils/dateUtils';
import { getCurrencySymbol } from '@/utils/currencyUtils';
import { CreditCard, Check, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface PaymentCardProps {
  payment: Payment;
  property?: Property;
}

export default function PaymentCard({ payment, property }: PaymentCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const getPaymentTypeIcon = () => {
    switch (payment.type) {
      case PaymentType.RENT:
      case PaymentType.EMI:
      case PaymentType.SOCIETY_FEE:
      case PaymentType.MILESTONE:
        return <CreditCard size={24} color={getPaymentTypeColor()} />;
      default:
        return <CreditCard size={24} color={getPaymentTypeColor()} />;
    }
  };
  
  const getPaymentTypeColor = () => {
    switch (payment.type) {
      case PaymentType.RENT:
        return '#3498DB';
      case PaymentType.EMI:
        return '#2ECC71';
      case PaymentType.MAINTENANCE:
        return '#E74C3C';
      case PaymentType.TAX:
        return '#9B59B6';
      case PaymentType.UTILITY:
        return '#F39C12';
      case PaymentType.SOCIETY_FEE:
        return '#1ABC9C';
      case PaymentType.MILESTONE:
        return '#34495E';
      default:
        return '#95A5A6';
    }
  };
  
  const getPaymentTypeLabel = () => {
    switch (payment.type) {
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
      default:
        return 'Other';
    }
  };
  
  const getStatusIcon = () => {
    switch (payment.status) {
      case PaymentStatus.PAID:
        return <Check size={16} color={colors.success} />;
      case PaymentStatus.UPCOMING:
        return <Clock size={16} color={colors.warning} />;
      case PaymentStatus.OVERDUE:
        return <AlertTriangle size={16} color={colors.error} />;
    }
  };
  
  const getStatusLabel = () => {
    switch (payment.status) {
      case PaymentStatus.PAID:
        return 'Paid';
      case PaymentStatus.UPCOMING:
        return 'Upcoming';
      case PaymentStatus.OVERDUE:
        return 'Overdue';
    }
  };
  
  const getStatusColor = () => {
    switch (payment.status) {
      case PaymentStatus.PAID:
        return colors.success;
      case PaymentStatus.UPCOMING:
        return colors.warning;
      case PaymentStatus.OVERDUE:
        return colors.error;
    }
  };
  
  const handlePress = () => {
    // In a real app, this would navigate to payment details
    console.log('Navigate to payment details:', payment.id);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}
    >
      <View style={styles.leftSection}>
        <View 
          style={[
            styles.iconContainer, 
            { backgroundColor: getPaymentTypeColor() + '20' }
          ]}
        >
          {getPaymentTypeIcon()}
        </View>
      </View>
      
      <View style={styles.middleSection}>
        <Text style={[styles.description, { color: colors.text }]}>
          {payment.description}
        </Text>
        
        <View style={styles.details}>
          <View 
            style={[
              styles.typeTag, 
              { backgroundColor: getPaymentTypeColor() + '20' }
            ]}
          >
            <Text 
              style={[
                styles.typeText, 
                { color: getPaymentTypeColor() }
              ]}
            >
              {getPaymentTypeLabel()}
            </Text>
          </View>
          
          <Text style={[styles.property, { color: colors.muted }]}>
            {property?.name || 'Unknown Property'}
          </Text>
        </View>
        
        <View style={styles.dateContainer}>
          <Text style={[styles.date, { color: colors.muted }]}>
            {formatDate(new Date(payment.date))}
          </Text>
          <View style={styles.statusContainer}>
            {getStatusIcon()}
            <Text 
              style={[
                styles.status, 
                { color: getStatusColor() }
              ]}
            >
              {getStatusLabel()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: colors.text }]}>
          {getCurrencySymbol('USD')}{payment.amount.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  leftSection: {
    marginRight: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 6,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  property: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  }
});