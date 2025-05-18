import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Plus, Chrome as Home, CreditCard, Image } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface QuickActionsProps {
  onAddProperty: () => void;
}

export default function QuickActions({ onAddProperty }: QuickActionsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Quick Actions</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onAddProperty}
        >
          <View style={styles.actionIcon}>
            <Home size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionText}>Add Property</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={() => router.push('/payment')}
        >
          <View style={styles.actionIcon}>
            <CreditCard size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionText}>Record Payment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          onPress={() => router.push('/gallery')}
        >
          <View style={styles.actionIcon}>
            <Image size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionText}>Upload Document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  }
});