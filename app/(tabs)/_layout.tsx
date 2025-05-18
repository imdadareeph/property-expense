import { Tabs } from 'expo-router';
import { Chrome as Home, Building2, CreditCard, Images, Settings } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { 
          height: 60,
          paddingBottom: 8,
          paddingTop: 8
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          tabBarLabel: 'Home',
          headerTitle: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="property"
        options={{
          title: 'Properties',
          tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
          tabBarLabel: 'Property',
          headerTitle: 'My Properties',
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} />,
          tabBarLabel: 'Payment',
          headerTitle: 'Payment Tracker',
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, size }) => <Images size={size} color={color} />,
          tabBarLabel: 'Gallery',
          headerTitle: 'Documents & Photos',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}