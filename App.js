import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { WalletProvider } from './src/context/WalletContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    </Stack.Navigator>
  );
}

function MainApp() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <WalletProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Scan') {
                iconName = 'qr-code-scanner';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }

              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF9900',
            tabBarInactiveTintColor: '#B0B0B0',
            tabBarStyle: {
              backgroundColor: '#1A1F71',
              borderTopWidth: 0,
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Scan" component={ScanScreen} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

