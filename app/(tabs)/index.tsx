import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  useColorScheme,
  TouchableOpacity
} from 'react-native';
import { useProperties } from '@/context/PropertiesContext';
import { usePayments } from '@/context/PaymentsContext';
import DashboardSummary from '@/components/home/DashboardSummary';
import ExpenseChart from '@/components/home/ExpenseChart';
import QuickActions from '@/components/home/QuickActions';
import UpcomingPayments from '@/components/home/UpcomingPayments';
import PropertySummary from '@/components/home/PropertySummary';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { properties, loading: propertiesLoading } = useProperties();
  const { 
    payments, 
    getUpcomingPayments, 
    getTotalExpenses, 
    loading: paymentsLoading 
  } = usePayments();
  const router = useRouter();
  
  const colors = Colors[colorScheme ?? 'light'];
  const upcomingPayments = getUpcomingPayments();
  
  if (propertiesLoading || paymentsLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  const navigateToAddProperty = () => {
    // In a real app, this would navigate to a form to add a new property
    console.log('Navigate to add property');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Hello, User!
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Here's your property portfolio overview
        </Text>
      </View>

      <DashboardSummary 
        propertyCount={properties.length}
        totalExpenses={getTotalExpenses()}
        upcomingPaymentsCount={upcomingPayments.length}
      />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Expense Breakdown
          </Text>
          <TouchableOpacity onPress={() => router.push('/payment')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ExpenseChart payments={payments} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Properties Overview
          </Text>
          <TouchableOpacity onPress={() => router.push('/property')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <PropertySummary properties={properties} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Upcoming Payments
          </Text>
          <TouchableOpacity onPress={() => router.push('/payment')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <UpcomingPayments payments={upcomingPayments} properties={properties} />
      </View>

      <QuickActions onAddProperty={navigateToAddProperty} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
    fontFamily: 'Inter-Medium',
  }
});