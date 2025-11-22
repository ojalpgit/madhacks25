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
import PayButton from '../components/PayButton';
import TransactionCard from '../components/TransactionCard';
import { colors } from '../utils/colors';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { wallet, transactions } = useWallet();

  const handlePay = () => {
    navigation.navigate('Scan');
  };

  const handleReceive = () => {
    // Navigate to receive screen or show QR code
    // For now, just show an alert or navigate to profile
    navigation.navigate('Profile');
  };

  const handleTransactionPress = (transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  const recentTransactions = transactions.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bitcoin Wallet</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <MaterialIcons name="person" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <DashboardCard
          balance={wallet.balance}
          scaledBalance={wallet.scaledBalance}
          usdEquivalent={wallet.usdEquivalent}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile', { screen: 'TransactionDetail' })}
          >
            <MaterialIcons name="history" size={24} color={colors.primary} />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile', { screen: 'Settings' })}
          >
            <MaterialIcons name="settings" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleReceive}
          >
            <MaterialIcons name="qr-code" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onPress={() => handleTransactionPress(transaction)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Pay Button - Fixed at bottom */}
      <View style={styles.payButtonContainer}>
        <PayButton onPress={handlePay} />
      </View>
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
    paddingBottom: 100,
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
  profileButton: {
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    width: 70,
    height: 70,
    borderRadius: 35,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
    fontWeight: '500',
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
  seeAll: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  payButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;

