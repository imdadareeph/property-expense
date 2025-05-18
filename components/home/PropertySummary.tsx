import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Property, PropertyType } from '@/types/property';
import Colors from '@/constants/Colors';
import { PieChart } from '@/components/common/PieChart';

interface PropertySummaryProps {
  properties: Property[];
}

export default function PropertySummary({ properties }: PropertySummaryProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const propertyTypeCounts = properties.reduce(
    (acc, property) => {
      acc[property.propertyType] = (acc[property.propertyType] || 0) + 1;
      return acc;
    },
    {} as Record<PropertyType, number>
  );
  
  const pieData = [
    {
      value: propertyTypeCounts[PropertyType.OWNED] || 0,
      color: Colors.propertyTypes.owned,
      name: 'Owned'
    },
    {
      value: propertyTypeCounts[PropertyType.RENTED] || 0,
      color: Colors.propertyTypes.rented,
      name: 'Rented'
    },
    {
      value: propertyTypeCounts[PropertyType.UNDER_CONSTRUCTION] || 0,
      color: Colors.propertyTypes.under_construction,
      name: 'Under Construction'
    }
  ].filter(item => item.value > 0);
  
  const totalPropertyValue = properties.reduce((sum, property) => sum + property.value, 0);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.row}>
        <View style={styles.chartContainer}>
          <PieChart 
            data={pieData}
            size={120}
            innerRadius={40}
          />
        </View>
        
        <View style={styles.statsContainer}>
          {pieData.map((item) => (
            <View key={item.name} style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: item.color }]} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      
      <View style={styles.totalContainer}>
        <Text style={[styles.totalLabel, { color: colors.muted }]}>
          Total Portfolio Value
        </Text>
        <Text style={[styles.totalValue, { color: colors.text }]}>
          ${totalPropertyValue.toLocaleString()}
        </Text>
      </View>
    </View>
  );
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    marginRight: 16,
  },
  statsContainer: {
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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