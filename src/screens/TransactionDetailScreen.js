import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { colors } from '../utils/colors';
import { formatBTC, formatUSD, formatDate } from '../utils/wallet';

const TransactionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction } = route.params || {};

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Transaction not found</Text>
      </SafeAreaView>
    );
  }

  const isSent = transaction.type === 'sent';
  const color = isSent ? colors.error : colors.success;
  const icon = isSent ? 'arrow-upward' : 'arrow-downward';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Transaction Icon */}
        <Animatable.View
          animation="zoomIn"
          duration={500}
          style={[styles.iconContainer, { backgroundColor: color + '20' }]}
        >
          <MaterialIcons name={icon} size={48} color={color} />
        </Animatable.View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color }]}>
            {isSent ? '-' : '+'}{formatBTC(transaction.amount)}
          </Text>
          <Text style={styles.usdAmount}>
            {formatUSD(transaction.amountUSD)}
          </Text>
        </View>

        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
            <MaterialIcons name="check-circle" size={16} color={colors.success} />
            <Text style={[styles.statusText, { color: colors.success }]}>
              Confirmed ({transaction.confirmations} confirmations)
            </Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vendor</Text>
            <Text style={styles.detailValue}>{transaction.merchant}</Text>
          </View>
          {transaction.vendorId && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Vendor ID</Text>
                <Text style={[styles.detailValue, styles.transactionId]}>
                  {transaction.vendorId}
                </Text>
              </View>
            </>
          )}
          {transaction.orderId && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order ID</Text>
                <Text style={[styles.detailValue, styles.transactionId]}>
                  {transaction.orderId}
                </Text>
              </View>
            </>
          )}
          {transaction.message && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Message</Text>
                <Text style={[styles.detailValue, styles.messageText]}>
                  {transaction.message}
                </Text>
              </View>
            </>
          )}
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Time</Text>
            <Text style={styles.detailValue}>{formatDate(transaction.date)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={[styles.detailValue, { color, textTransform: 'capitalize' }]}>
              {transaction.type}
            </Text>
          </View>
          {transaction.totalSbtc && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total SBTC</Text>
                <Text style={styles.detailValue}>
                  {transaction.totalSbtc.toLocaleString()} SBTC
                </Text>
              </View>
            </>
          )}
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={[styles.detailValue, styles.transactionId]}>
              {transaction.id}
            </Text>
          </View>
        </View>

        {/* Items Card */}
        {transaction.items && transaction.items.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Items</Text>
            {transaction.items.map((item, index) => (
              <View key={index}>
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemQuantity}>
                        Quantity: {item.quantity || 1}
                      </Text>
                      {item.priceBtc && (
                        <Text style={styles.itemUnitPrice}>
                          Unit: {formatBTC(item.priceBtc)}
                          {item.priceSbtc !== undefined && ` (${item.priceSbtc.toLocaleString()} SBTC)`}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemSubtotal}>
                      {formatBTC(item.subtotalBtc || 0)}
                    </Text>
                    {item.subtotalSbtc !== undefined && (
                      <Text style={styles.itemSubtotalSbtc}>
                        {item.subtotalSbtc.toLocaleString()} SBTC
                      </Text>
                    )}
                    <Text style={styles.itemPriceUSD}>
                      {formatUSD(item.priceUSD || (item.subtotalBtc || 0) * 25000)}
                    </Text>
                  </View>
                </View>
                {index < transaction.items.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
            <View style={styles.totalContainer}>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <View>
                  <Text style={styles.totalLabel}>Total</Text>
                  {transaction.totalSbtc && (
                    <Text style={styles.totalSbtcLabel}>
                      {transaction.totalSbtc.toLocaleString()} SBTC
                    </Text>
                  )}
                </View>
                <View style={styles.totalAmountContainer}>
                  <Text style={styles.totalValue}>
                    {formatBTC(transaction.amount)}
                  </Text>
                  <Text style={styles.totalUSD}>
                    {formatUSD(transaction.amountUSD)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // In a real app, copy transaction ID to clipboard
              console.log('Copy transaction ID:', transaction.id);
            }}
          >
            <MaterialIcons name="content-copy" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Copy Transaction ID</Text>
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
    fontSize: 20,
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  usdAmount: {
    fontSize: 20,
    color: colors.textLight,
  },
  statusContainer: {
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    width: '100%',
    maxWidth: '100%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  transactionId: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  messageText: {
    fontStyle: 'italic',
    color: colors.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  itemDetails: {
    marginTop: 4,
  },
  itemQuantity: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 2,
  },
  itemUnitPrice: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  itemSubtotalSbtc: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  itemPriceUSD: {
    fontSize: 12,
    color: colors.textLight,
  },
  totalContainer: {
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalSbtcLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
    fontFamily: 'monospace',
  },
  totalAmountContainer: {
    alignItems: 'flex-end',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  totalUSD: {
    fontSize: 16,
    color: colors.textLight,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default TransactionDetailScreen;

