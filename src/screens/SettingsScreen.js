import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useWallet } from '../context/WalletContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/colors';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { wallet } = useWallet();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [name, setName] = useState(user?.name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john.doe@example.com');

  const handleSave = () => {
    Alert.alert('Success', 'Settings saved successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={24} color={colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <MaterialIcons name="chevron-right" size={24} color={colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Wallet Address</Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              value={wallet.address}
              editable={false}
              multiline
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <SettingItem
            icon="notifications"
            title="Notifications"
            subtitle="Receive payment notifications"
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.secondary}
              />
            }
          />

          <SettingItem
            icon="security"
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security"
            rightComponent={
              <Switch
                value={twoFA}
                onValueChange={setTwoFA}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor={colors.secondary}
              />
            }
          />

          <SettingItem
            icon="lock"
            title="Change PIN"
            subtitle="Update your security PIN"
            onPress={() => Alert.alert('Change PIN', 'Feature coming soon')}
          />
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <SettingItem
            icon="attach-money"
            title="Currency"
            subtitle={currency}
            onPress={() => Alert.alert('Currency', 'Feature coming soon')}
          />

          <SettingItem
            icon="language"
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert('Language', 'Feature coming soon')}
          />

          <SettingItem
            icon="brightness-6"
            title="Theme"
            subtitle="Light"
            onPress={() => Alert.alert('Theme', 'Feature coming soon')}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <SettingItem
            icon="info"
            title="App Version"
            subtitle="1.0.0"
          />

          <SettingItem
            icon="help"
            title="Help & Support"
            onPress={() => Alert.alert('Help', 'Contact support at support@bitcoinpayment.app')}
          />

          <SettingItem
            icon="privacy-tip"
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy Policy', 'Feature coming soon')}
          />

          <SettingItem
            icon="description"
            title="Terms of Service"
            onPress={() => Alert.alert('Terms', 'Feature coming soon')}
          />
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color={colors.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressInput: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.error,
    gap: 8,
  },
  logoutButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;

