import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch, 
  ScrollView, 
  useColorScheme 
} from 'react-native';
import Colors from '@/constants/Colors';
import { User, Cloud, DollarSign, Bell, Moon, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // State for switches
  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === 'dark');
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.profileSection, { backgroundColor: colors.card }]}>
        <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarInitial}>U</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>User Name</Text>
          <Text style={[styles.profileEmail, { color: colors.muted }]}>user@example.com</Text>
        </View>
        <TouchableOpacity style={[styles.editButton, { borderColor: colors.border }]}>
          <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionTitle}>
        <Text style={[styles.sectionTitleText, { color: colors.text }]}>Preferences</Text>
      </View>
      
      <View style={styles.settingsGroup}>
        <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <DollarSign size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Currency</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={[styles.settingValue, { color: colors.muted }]}>USD</Text>
          </View>
        </View>
        
        <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Bell size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.muted, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Moon size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: colors.muted, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>
      
      <View style={styles.sectionTitle}>
        <Text style={[styles.sectionTitleText, { color: colors.text }]}>Data Management</Text>
      </View>
      
      <View style={styles.settingsGroup}>
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Cloud size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Backup Data</Text>
          </View>
          <Text style={[styles.settingAction, { color: colors.primary }]}>Backup</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Cloud size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Restore Data</Text>
          </View>
          <Text style={[styles.settingAction, { color: colors.primary }]}>Restore</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionTitle}>
        <Text style={[styles.sectionTitleText, { color: colors.text }]}>Support</Text>
      </View>
      
      <View style={styles.settingsGroup}>
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <HelpCircle size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Help & Support</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Shield size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.error }]}>
        <LogOut size={20} color="#FFFFFF" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={[styles.versionText, { color: colors.muted }]}>
        Version 1.0.0
      </Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionTitleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  settingsGroup: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  settingRight: {},
  settingValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  settingAction: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  }
});