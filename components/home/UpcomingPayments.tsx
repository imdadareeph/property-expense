import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { Payment } from '@/types/payment';
import { Property } from '@/types/property';
import Colors from '@/constants/Colors';
import { formatDate } from '@/utils/dateUtils';
import { CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface UpcomingPaymentsProps {
  payments: Payment[];
  properties: Property[];
}

export default function UpcomingPayments({ payments, properties }: UpcomingPaymentsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  if (payments.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No upcoming payments due.
        </Text>
      </View>
    );
  }
  
  const renderPaymentItem = ({ item }: { item: Payment }) => {
    const property = properties.find(p => p.id === item.propertyId);
    
    return (
      <TouchableOpacity 
        style={[styles.paymentItem, { backgroundColor: colors.card }]}
        onPress={() => router.push('/payment')}
      >
        <View style={styles.paymentIconContainer}>
          <CreditCard size={20} color={colors.primary} />
        </View>
        <View style={styles.paymentDetails}>
          <Text style={[styles.paymentTitle, { color: colors.text }]}>
            {item.description}
          </Text>
          <Text style={[styles.paymentProperty, { color: colors.muted }]}>
            {property?.name || 'Unknown Property'}
          </Text>
        </View>
        <View style={styles.paymentRight}>
          <Text style={[styles.paymentAmount, { color: colors.text }]}>
            ${item.amount.toLocaleString()}
          </Text>
          <Text style={[styles.paymentDate, { color: colors.warning }]}>
            {formatDate(new Date(item.date))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <FlatList
      data={payments.slice(0, 3)} // Show only first 3 payments
      keyExtractor={(item) => item.id}
      renderItem={renderPaymentItem}
      scrollEnabled={false}
      ListFooterComponent={() => (
        payments.length > 3 ? (
          <TouchableOpacity 
            style={[styles.viewAllButton, { backgroundColor: colors.card }]}
            onPress={() => router.push('/payment')}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View All ({payments.length})
            </Text>
          </TouchableOpacity>
        ) : null
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  paymentProperty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  viewAllButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  }
});