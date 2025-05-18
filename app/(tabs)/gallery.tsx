import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  useColorScheme,
  Dimensions
} from 'react-native';
import { useProperties } from '@/context/PropertiesContext';
import Colors from '@/constants/Colors';
import { Folder, Image as ImageIcon, FileText } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

// Mock data for documents and photos
const mockDocuments = [
  { id: '1', name: 'Lease Agreement.pdf', type: 'document', property: '1' },
  { id: '2', name: 'Sale Deed.pdf', type: 'document', property: '2' },
  { id: '3', name: 'NOC Certificate.pdf', type: 'document', property: '3' },
  { id: '4', name: 'Property Tax.pdf', type: 'document', property: '1' },
  { id: '5', name: 'Floor Plan.pdf', type: 'document', property: '2' },
];

const mockPhotos = [
  { id: '1', url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', type: 'photo', property: '1' },
  { id: '2', url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', type: 'photo', property: '2' },
  { id: '3', url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg', type: 'photo', property: '3' },
  { id: '4', url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', type: 'photo', property: '1' },
  { id: '5', url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', type: 'photo', property: '2' },
  { id: '6', url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', type: 'photo', property: '3' },
];

type GalleryTab = 'photos' | 'documents' | 'properties';

export default function GalleryScreen() {
  const { properties, loading } = useProperties();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [activeTab, setActiveTab] = useState<GalleryTab>('photos');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  
  const filteredPhotos = selectedProperty 
    ? mockPhotos.filter(photo => photo.property === selectedProperty)
    : mockPhotos;
    
  const filteredDocuments = selectedProperty
    ? mockDocuments.filter(doc => doc.property === selectedProperty)
    : mockDocuments;

  const handlePropertySelect = (propertyId: string) => {
    setSelectedProperty(propertyId === selectedProperty ? null : propertyId);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading gallery...</Text>
      </View>
    );
  }

  const renderPhotoItem = ({ item }: { item: typeof mockPhotos[0] }) => (
    <TouchableOpacity style={styles.photoItem}>
      <Image source={{ uri: item.url }} style={styles.photoImage} />
    </TouchableOpacity>
  );

  const renderDocumentItem = ({ item }: { item: typeof mockDocuments[0] }) => {
    const property = properties.find(p => p.id === item.property);
    
    return (
      <TouchableOpacity style={[styles.documentItem, { backgroundColor: colors.card }]}>
        <View style={styles.documentIconContainer}>
          <FileText size={24} color={colors.primary} />
        </View>
        <Text 
          style={[styles.documentName, { color: colors.text }]} 
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text 
          style={[styles.documentProperty, { color: colors.muted }]} 
          numberOfLines={1}
        >
          {property?.name || 'Unknown Property'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPropertyItem = ({ item }: { item: typeof properties[0] }) => (
    <TouchableOpacity 
      style={[
        styles.propertyItem, 
        { 
          backgroundColor: colors.card,
          borderColor: selectedProperty === item.id ? colors.primary : colors.border
        }
      ]}
      onPress={() => handlePropertySelect(item.id)}
    >
      <View style={styles.propertyIconContainer}>
        <Folder 
          size={24} 
          color={Colors.propertyTypes[item.propertyType]} 
        />
      </View>
      <Text 
        style={[styles.propertyName, { color: colors.text }]} 
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text 
        style={[styles.propertyInfo, { color: colors.muted }]} 
        numberOfLines={1}
      >
        {mockPhotos.filter(p => p.property === item.id).length} photos, {mockDocuments.filter(d => d.property === item.id).length} docs
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'photos' && { 
              backgroundColor: colors.primary,
              borderColor: colors.primary
            }
          ]}
          onPress={() => setActiveTab('photos')}
        >
          <ImageIcon 
            size={18} 
            color={activeTab === 'photos' ? '#FFFFFF' : colors.primary} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'photos' ? '#FFFFFF' : colors.text }
            ]}
          >
            Photos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'documents' && { 
              backgroundColor: colors.primary,
              borderColor: colors.primary
            }
          ]}
          onPress={() => setActiveTab('documents')}
        >
          <FileText 
            size={18} 
            color={activeTab === 'documents' ? '#FFFFFF' : colors.primary} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'documents' ? '#FFFFFF' : colors.text }
            ]}
          >
            Documents
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'properties' && { 
              backgroundColor: colors.primary,
              borderColor: colors.primary
            }
          ]}
          onPress={() => setActiveTab('properties')}
        >
          <Folder 
            size={18} 
            color={activeTab === 'properties' ? '#FFFFFF' : colors.primary} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'properties' ? '#FFFFFF' : colors.text }
            ]}
          >
            Properties
          </Text>
        </TouchableOpacity>
      </View>
      
      {selectedProperty && (
        <View style={styles.filterInfo}>
          <Text style={[styles.filterText, { color: colors.text }]}>
            Filtered by: {properties.find(p => p.id === selectedProperty)?.name}
          </Text>
          <TouchableOpacity onPress={() => setSelectedProperty(null)}>
            <Text style={[styles.clearFilter, { color: colors.primary }]}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {activeTab === 'photos' && (
        <FlatList
          data={filteredPhotos}
          keyExtractor={(item) => item.id}
          renderItem={renderPhotoItem}
          numColumns={2}
          columnWrapperStyle={styles.photoGrid}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No photos found.
              </Text>
            </View>
          )}
        />
      )}
      
      {activeTab === 'documents' && (
        <FlatList
          data={filteredDocuments}
          keyExtractor={(item) => item.id}
          renderItem={renderDocumentItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No documents found.
              </Text>
            </View>
          )}
        />
      )}
      
      {activeTab === 'properties' && (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={renderPropertyItem}
          numColumns={2}
          columnWrapperStyle={styles.photoGrid}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No properties found.
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  clearFilter: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  photoGrid: {
    justifyContent: 'space-between',
  },
  photoItem: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  documentItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    marginRight: 16,
  },
  documentName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  documentProperty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  propertyItem: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  propertyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  propertyName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
    textAlign: 'center',
  },
  propertyInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
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