import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  useColorScheme 
} from 'react-native';
import { PaymentStatus, PaymentType } from '@/types/payment';
import { Property } from '@/types/property';
import Colors from '@/constants/Colors';
import { X } from 'lucide-react-native';

interface PaymentFilterProps {
  statusFilter: PaymentStatus | null;
  typeFilter: PaymentType | null;
  propertyFilter: string | null;
  onStatusChange: (status: PaymentStatus | null) => void;
  onTypeChange: (type: PaymentType | null) => void;
  onPropertyChange: (propertyId: string | null) => void;
  onResetFilters: () => void;
  properties: Property[];
}

export default function PaymentFilter({
  statusFilter,
  typeFilter,
  propertyFilter,
  onStatusChange,
  onTypeChange,
  onPropertyChange,
  onResetFilters,
  properties
}: PaymentFilterProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const isAnyFilterActive = statusFilter !== null || typeFilter !== null || propertyFilter !== null;
  
  const getStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return 'Paid';
      case PaymentStatus.UPCOMING:
        return 'Upcoming';
      case PaymentStatus.OVERDUE:
        return 'Overdue';
    }
  };
  
  const getTypeLabel = (type: PaymentType) => {
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
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Filter</Text>
        {isAnyFilterActive && (
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={onResetFilters}
          >
            <Text style={[styles.resetText, { color: colors.primary }]}>
              Reset
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.sections}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Status
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                statusFilter === null && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => onStatusChange(null)}
            >
              <Text 
                style={[
                  styles.chipText,
                  statusFilter === null && { color: '#FFFFFF' }
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {Object.values(PaymentStatus).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterChip,
                  statusFilter === status && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => onStatusChange(status)}
              >
                <Text 
                  style={[
                    styles.chipText,
                    statusFilter === status && { color: '#FFFFFF' }
                  ]}
                >
                  {getStatusLabel(status)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Type
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                typeFilter === null && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => onTypeChange(null)}
            >
              <Text 
                style={[
                  styles.chipText,
                  typeFilter === null && { color: '#FFFFFF' }
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {Object.values(PaymentType).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  typeFilter === type && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => onTypeChange(type)}
              >
                <Text 
                  style={[
                    styles.chipText,
                    typeFilter === type && { color: '#FFFFFF' }
                  ]}
                >
                  {getTypeLabel(type)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Property
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                propertyFilter === null && { backgroundColor: colors.primary, borderColor: colors.primary }
              ]}
              onPress={() => onPropertyChange(null)}
            >
              <Text 
                style={[
                  styles.chipText,
                  propertyFilter === null && { color: '#FFFFFF' }
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                style={[
                  styles.filterChip,
                  propertyFilter === property.id && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => onPropertyChange(property.id)}
              >
                <Text 
                  style={[
                    styles.chipText,
                    propertyFilter === property.id && { color: '#FFFFFF' }
                  ]}
                >
                  {property.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      
      {isAnyFilterActive && (
        <View style={[styles.activeFilters, { backgroundColor: colors.card }]}>
          <Text style={[styles.activeFiltersTitle, { color: colors.text }]}>
            Active Filters:
          </Text>
          <View style={styles.filterTags}>
            {statusFilter !== null && (
              <View style={styles.filterTag}>
                <Text style={styles.filterTagText}>
                  Status: {getStatusLabel(statusFilter)}
                </Text>
                <TouchableOpacity 
                  style={styles.removeTagButton}
                  onPress={() => onStatusChange(null)}
                >
                  <X size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
            
            {typeFilter !== null && (
              <View style={styles.filterTag}>
                <Text style={styles.filterTagText}>
                  Type: {getTypeLabel(typeFilter)}
                </Text>
                <TouchableOpacity 
                  style={styles.removeTagButton}
                  onPress={() => onTypeChange(null)}
                >
                  <X size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
            
            {propertyFilter !== null && (
              <View style={styles.filterTag}>
                <Text style={styles.filterTagText}>
                  Property: {properties.find(p => p.id === propertyFilter)?.name}
                </Text>
                <TouchableOpacity 
                  style={styles.removeTagButton}
                  onPress={() => onPropertyChange(null)}
                >
                  <X size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resetText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  sections: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#757575',
  },
  activeFilters: {
    padding: 12,
    borderRadius: 8,
  },
  activeFiltersTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498DB',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  filterTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginRight: 4,
  },
  removeTagButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});