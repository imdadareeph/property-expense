import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropertyType, Property } from '@/types/property';

interface PropertiesContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
  loading: boolean;
}

const PropertiesContext = createContext<PropertiesContextType>({
  properties: [],
  addProperty: () => {},
  updateProperty: () => {},
  deleteProperty: () => {},
  getProperty: () => undefined,
  loading: true,
});

// Sample data for initial app state
const initialProperties: Property[] = [
  {
    id: '1',
    name: 'Skyline Apartment',
    address: '123 High Street, Downtown',
    city: 'New York',
    size: '1200 sq ft',
    type: 'Apartment',
    propertyType: PropertyType.RENTED,
    rentAmount: 2500,
    leaseStartDate: new Date('2023-01-15').toISOString(),
    leaseDuration: 12,
    nextPaymentDate: new Date('2023-09-15').toISOString(),
    value: 450000,
    tags: ['Investment', 'Downtown'],
    images: [],
  },
  {
    id: '2',
    name: 'Sunset Villa',
    address: '456 Ocean Avenue',
    city: 'Los Angeles',
    size: '2800 sq ft',
    type: 'Villa',
    propertyType: PropertyType.OWNED,
    purchaseDate: new Date('2020-03-10').toISOString(),
    downPayment: 150000,
    loanAmount: 500000,
    emi: 2800,
    nextEmiDate: new Date('2023-09-10').toISOString(),
    value: 750000,
    tags: ['Primary Residence', 'Beach'],
    images: [],
  },
  {
    id: '3',
    name: 'Green Valley Condo',
    address: '789 Mountain View',
    city: 'Denver',
    size: '950 sq ft',
    type: 'Condo',
    propertyType: PropertyType.UNDER_CONSTRUCTION,
    totalCost: 320000,
    paidAmount: 80000,
    completionDate: new Date('2024-06-30').toISOString(),
    nextMilestoneDate: new Date('2023-10-15').toISOString(),
    nextMilestoneAmount: 40000,
    constructionProgress: 25,
    tags: ['Investment', 'Mountain View'],
    images: [],
  }
];

export const PropertiesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const storedProperties = await AsyncStorage.getItem('properties');
      if (storedProperties) {
        setProperties(JSON.parse(storedProperties));
      } else {
        // Use sample data if no stored properties
        setProperties(initialProperties);
        await AsyncStorage.setItem('properties', JSON.stringify(initialProperties));
      }
    } catch (error) {
      console.error('Failed to load properties:', error);
      // Fall back to sample data on error
      setProperties(initialProperties);
    } finally {
      setLoading(false);
    }
  };

  const saveProperties = async (updatedProperties: Property[]) => {
    try {
      await AsyncStorage.setItem('properties', JSON.stringify(updatedProperties));
    } catch (error) {
      console.error('Failed to save properties:', error);
    }
  };

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
    };
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    saveProperties(updatedProperties);
  };

  const updateProperty = (property: Property) => {
    const updatedProperties = properties.map(p => 
      p.id === property.id ? property : p
    );
    setProperties(updatedProperties);
    saveProperties(updatedProperties);
  };

  const deleteProperty = (id: string) => {
    const updatedProperties = properties.filter(p => p.id !== id);
    setProperties(updatedProperties);
    saveProperties(updatedProperties);
  };

  const getProperty = (id: string) => {
    return properties.find(p => p.id === id);
  };

  return (
    <PropertiesContext.Provider 
      value={{ 
        properties, 
        addProperty, 
        updateProperty, 
        deleteProperty, 
        getProperty,
        loading
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => useContext(PropertiesContext);