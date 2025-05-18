import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  useColorScheme 
} from 'react-native';
import { usePayments } from '@/context/PaymentsContext';
import { useProperties } from '@/context/PropertiesContext';
import PaymentCard from '@/components/payment/PaymentCard';
import PaymentFilter from '@/components/payment/PaymentFilter';
import PaymentSummary from '@/components/payment/PaymentSummary';
import { Payment, PaymentStatus, PaymentType } from '@/types/payment';
import Colors from '@/constants/Colors';
import { Plus } from 'lucide-react-native';

export default function PaymentScreen() {
  const { payments, loading } = usePayments();
  const { properties } = useProperties();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<PaymentType | null>(null);
  const [propertyFilter, setPropertyFilter] = useState<string | null>(null);
  
  const filteredPayments = payments.filter(payment => {
    const matchesStatus = statusFilter ? payment.status === statusFilter : true;
    const matchesType = typeFilter ? payment.type === typeFilter : true;
    const matchesProperty = propertyFilter ? payment.propertyId === propertyFilter : true;
    
    return matchesStatus && matchesType && matchesProperty;
  });

  const handleAddPayment = () => {
    // In a real app, this would navigate to a form to add a new payment
    console.log('Add new payment');
  };

  const resetFilters = () => {
    setStatusFilter(null);
    setTypeFilter(null);
    setPropertyFilter(null);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading payments...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PaymentSummary payments={payments} />
      
      <PaymentFilter
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        propertyFilter={propertyFilter}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
        onPropertyChange={setPropertyFilter}
        onResetFilters={resetFilters}
        properties={properties}
      />
      
      <Text style={[styles.listTitle, { color: colors.text }]}>
        {filteredPayments.length} {filteredPayments.length === 1 ? 'Payment' : 'Payments'}
      </Text>
      
      <FlatList
        data={filteredPayments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PaymentCard payment={item} property={properties.find(p => p.id === item.propertyId)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No payments found. Add your first payment!
            </Text>
          </View>
        )}
      />
      
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={handleAddPayment}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 48,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
    fontFamily: 'Inter-Medium',
  }
});