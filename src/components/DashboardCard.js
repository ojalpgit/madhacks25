import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors } from '../utils/colors';
import { formatBTC, formatUSD } from '../utils/wallet';

const DashboardCard = ({ balance, scaledBalance, usdEquivalent }) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.label}>Bitcoin Balance</Text>
        <Text style={styles.btcAmount}>{formatBTC(balance)}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Scaled (Satoshis)</Text>
          <Text style={styles.detailValue}>{scaledBalance.toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>USD Equivalent</Text>
          <Text style={styles.detailValue}>{formatUSD(usdEquivalent)}</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  btcAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  details: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});

export default DashboardCard;

