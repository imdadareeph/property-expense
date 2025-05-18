import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Property, PropertyType } from '@/types/property';
import Colors from '@/constants/Colors';
import { MapPin, Chrome as Home, Info, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  const getPropertyTypeLabel = (type: PropertyType) => {
    switch (type) {
      case PropertyType.OWNED:
        return 'Owned';
      case PropertyType.RENTED:
        return 'Rented';
      case PropertyType.UNDER_CONSTRUCTION:
        return 'Under Construction';
    }
  };
  
  const getPropertyTypeColor = (type: PropertyType) => {
    return Colors.propertyTypes[type];
  };
  
  const getPropertyStatusInfo = () => {
    switch (property?.propertyType) {
      case PropertyType.OWNED:
        return property?.emi 
          ? `EMI: $${property.emi}/month` 
          : 'Fully Paid';
      case PropertyType.RENTED:
        return property?.rentAmount 
          ? `Rent: $${property.rentAmount}/month` 
          : 'No rent details';
      case PropertyType.UNDER_CONSTRUCTION:
        return property?.constructionProgress 
          ? `Progress: ${property.constructionProgress}%` 
          : 'In progress';
      default:
        return 'Status unavailable';
    }
  };
  
  const handlePress = () => {
    if (property?.id) {
      router.push(`/property/${property.id}`);
    }
  };

  // If property is undefined, return null or a placeholder
  if (!property) {
    return null;
  }
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}
    >
      <View style={styles.header}>
        <View 
          style={[
            styles.typeTag, 
            { backgroundColor: getPropertyTypeColor(property.propertyType) + '20' }
          ]}
        >
          <Text 
            style={[
              styles.typeText, 
              { color: getPropertyTypeColor(property.propertyType) }
            ]}
          >
            {getPropertyTypeLabel(property.propertyType)}
          </Text>
        </View>
        
        <Text style={[styles.value, { color: colors.text }]}>
          ${property.value?.toLocaleString() ?? 'N/A'}
        </Text>
      </View>
      
      <Text style={[styles.name, { color: colors.text }]}>
        {property.name}
      </Text>
      
      <View style={styles.locationContainer}>
        <MapPin size={16} color={colors.muted} />
        <Text style={[styles.location, { color: colors.text }]}>
          {property.address}, {property.city}
        </Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Home size={16} color={colors.muted} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {property.size}, {property.type}
          </Text>
        </View>
        
        <View style={styles.detail}>
          <Info size={16} color={colors.muted} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {getPropertyStatusInfo()}
          </Text>
        </View>
      </View>
      
      {property.tags && property.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {property.tags.map((tag, index) => (
            <View 
              key={index} 
              style={[
                styles.tag, 
                { backgroundColor: colors.primary + '10' }
              ]}
            >
              <Text style={[styles.tagText, { color: colors.primary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.viewDetails, { color: colors.primary }]}>
          View Details
        </Text>
        <ArrowRight size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 6,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  viewDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 6,
  }
});