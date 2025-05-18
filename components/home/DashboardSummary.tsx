import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Building2, CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';

interface DashboardSummaryProps {
  propertyCount: number;
  totalExpenses: number;
  upcomingPaymentsCount: number;
}

export default function DashboardSummary({ 
  propertyCount, 
  totalExpenses, 
  upcomingPaymentsCount 
}: DashboardSummaryProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Building2 size={24} color={colors.primary} />
        </View>
        <Text style={[styles.value, { color: colors.text }]}>{propertyCount}</Text>
        <Text style={[styles.label, { color: colors.muted }]}>Properties</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
          <CreditCard size={24} color={colors.secondary} />
        </View>
        <Text style={[styles.value, { color: colors.text }]}>
          ${totalExpenses.toLocaleString()}
        </Text>
        <Text style={[styles.label, { color: colors.muted }]}>Total Spent</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
          <AlertCircle size={24} color={colors.warning} />
        </View>
        <Text style={[styles.value, { color: colors.text }]}>{upcomingPaymentsCount}</Text>
        <Text style={[styles.label, { color: colors.muted }]}>Upcoming</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  }
});