import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useWallet } from '../context/WalletContext';
import DashboardCard from '../components/DashboardCard';
import TransactionCard from '../components/TransactionCard';
import { colors } from '../utils/colors';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { wallet, transactions } = useWallet();

  const handleTransactionPress = (transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            onPress={handleSettings}
            style={styles.settingsButton}
          >
            <MaterialIcons name="settings" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <DashboardCard
          balance={wallet.balance}
          scaledBalance={wallet.scaledBalance}
          usdEquivalent={wallet.usdEquivalent}
        />

        {/* Wallet Address */}
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
            <Text style={styles.addressLabel}>Wallet Address</Text>
          </View>
          <Text style={styles.addressValue} numberOfLines={1} ellipsizeMode="middle">
            {wallet.address}
          </Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => {
              // In a real app, copy to clipboard
              console.log('Copy to clipboard:', wallet.address);
            }}
          >
            <MaterialIcons name="content-copy" size={16} color={colors.accent} />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="history" size={64} color={colors.textLight} />
              <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
          ) : (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onPress={() => handleTransactionPress(transaction)}
              />
            ))
          )}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressCard: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  addressLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  addressValue: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
  },
  copyButtonText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 16,
  },
});

export default ProfileScreen;

