import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  useColorScheme,
  TextInput
} from 'react-native';
import { useProperties } from '@/context/PropertiesContext';
import PropertyCard from '@/components/property/PropertyCard';
import { Property, PropertyType } from '@/types/property';
import Colors from '@/constants/Colors';
import { Filter, Plus } from 'lucide-react-native';

export default function PropertyScreen() {
  const { properties, loading } = useProperties();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<PropertyType | null>(null);
  
  const filteredProperties = properties.filter(property => {
    // Apply search filter
    const matchesSearch = 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply type filter
    const matchesType = activeFilter ? property.propertyType === activeFilter : true;
    
    return matchesSearch && matchesType;
  });

  const handleAddProperty = () => {
    // In a real app, this would navigate to a form to add a new property
    console.log('Add new property');
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading properties...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput, 
            { 
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border
            }
          ]}
          placeholder="Search properties..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={[styles.filterContainer, { backgroundColor: colors.card }]}>
          <TouchableOpacity
            style={[
              styles.filterOption,
              activeFilter === null && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setActiveFilter(null)}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              activeFilter === PropertyType.OWNED && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setActiveFilter(PropertyType.OWNED)}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>Owned</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              activeFilter === PropertyType.RENTED && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setActiveFilter(PropertyType.RENTED)}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>Rented</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              activeFilter === PropertyType.UNDER_CONSTRUCTION && { backgroundColor: colors.primary + '20' }
            ]}
            onPress={() => setActiveFilter(PropertyType.UNDER_CONSTRUCTION)}
          >
            <Text style={[styles.filterText, { color: colors.text }]}>Under Construction</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No properties found. Add your first property!
            </Text>
          </View>
        )}
      />
      
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={handleAddProperty}
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
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