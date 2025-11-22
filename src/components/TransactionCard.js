import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { formatBTC, formatUSD, formatDate } from '../utils/wallet';

const TransactionCard = ({ transaction, onPress }) => {
  const isSent = transaction.type === 'sent';
  const color = isSent ? colors.error : colors.success;
  const icon = isSent ? 'arrow-upward' : 'arrow-downward';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <MaterialIcons name={icon} size={24} color={color} />
        </View>
        <View style={styles.info}>
          <Text style={styles.merchant}>{transaction.merchant}</Text>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color }]}>
            {isSent ? '-' : '+'}{formatBTC(transaction.amount)}
          </Text>
          <Text style={styles.usdAmount}>
            {formatUSD(transaction.amountUSD)}
          </Text>
        </View>
      </View>
      {transaction.items && transaction.items.length > 0 && (
        <View style={styles.itemsContainer}>
          <Text style={styles.itemsLabel}>
            {transaction.items.length} item{transaction.items.length > 1 ? 's' : ''}
          </Text>
        </View>
      )}
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
          <MaterialIcons name="check-circle" size={14} color={colors.success} />
          <Text style={[styles.statusText, { color: colors.success }]}>
            {transaction.confirmations} confirmations
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  usdAmount: {
    fontSize: 12,
    color: colors.textLight,
  },
  itemsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  itemsLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  statusContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default TransactionCard;

