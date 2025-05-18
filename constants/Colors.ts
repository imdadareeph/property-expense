const tintColorLight = '#0A3D62';
const tintColorDark = '#3498DB';

export default {
  light: {
    text: '#000',
    background: '#F7F9FC',
    tint: tintColorLight,
    tabIconDefault: '#BDBDBD',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    primary: '#0A3D62',
    secondary: '#F39C12',
    accent: '#2ECC71',
    border: '#E0E0E0',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    muted: '#95A5A6',
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: '#767676',
    tabIconSelected: tintColorDark,
    card: '#1E1E1E',
    primary: '#3498DB',
    secondary: '#F5B041',
    accent: '#2ECC71',
    border: '#333333',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    muted: '#95A5A6',
  },
  propertyTypes: {
    rented: '#3498DB', // Blue
    owned: '#2ECC71',  // Green
    under_construction: '#F39C12' // Orange
  }
};