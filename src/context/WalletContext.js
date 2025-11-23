import React, { createContext, useState, useContext } from 'react';
import { mockWallet, mockTransactions } from '../utils/wallet';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(mockWallet);
  const [transactions, setTransactions] = useState(mockTransactions);

  const updateBalance = (newBalance) => {
    setWallet((prev) => ({
      ...prev,
      balance: newBalance,
      scaledBalance: newBalance * 100000000, // Convert to satoshis
      usdEquivalent: newBalance * 25000, // Mock USD rate
    }));
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
    // Update balance
    if (transaction.type === 'sent') {
      updateBalance(wallet.balance - transaction.amount);
    } else {
      updateBalance(wallet.balance + transaction.amount);
    }
  };

  const processPayment = (orderData) => {
    // Extract data from orderData object (from QR code)
    // Format: {"vendorId":"...","vendorName":"...","orderId":"...","totalBTC":...,"totalSbtc":...,"items":[...],"generatedAt":"...","message":"..."}
    const vendorId = orderData.vendorId || '';
    const vendorName = orderData.vendorName || orderData.merchant || 'Merchant';
    const orderId = orderData.orderId || '';
    const totalBTC = orderData.totalBTC || orderData.amount || 0;
    const totalSBTC = orderData.totalSbtc || 0;
    const message = orderData.message || '';
    const generatedAt = orderData.generatedAt || new Date().toISOString();
    
    // Process items with all details from JSON format
    // Items format: [{"name":"...","quantity":...,"priceBtc":...,"priceSbtc":...,"subtotalBtc":...}]
    const transactionItems = (orderData.items || []).map((item) => {
      const quantity = item.quantity || 1;
      const priceBtc = item.priceBtc || 0;
      const priceSbtc = item.priceSbtc || 0;
      // Use subtotalBtc from JSON if available, otherwise calculate
      const subtotalBtc = item.subtotalBtc !== undefined ? item.subtotalBtc : (priceBtc * quantity);
      const subtotalSbtc = (priceSbtc * quantity);
      
      return {
        name: item.name || 'Item',
        quantity: quantity,
        priceBtc: priceBtc,
        priceSbtc: priceSbtc,
        subtotalBtc: subtotalBtc,
        subtotalSbtc: subtotalSbtc,
        priceUSD: subtotalBtc * 25000,
      };
    });

    const newTransaction = {
      id: Date.now().toString(),
      type: 'sent',
      merchant: vendorName,
      vendorId: vendorId,
      orderId: orderId,
      amount: totalBTC,
      amountUSD: totalBTC * 25000,
      totalSbtc: totalSBTC,
      date: generatedAt,
      message: message,
      status: 'confirmed',
      confirmations: 0,
      items: transactionItems.length > 0 ? transactionItems : [
        { 
          name: 'Payment', 
          quantity: 1,
          priceBtc: totalBTC,
          priceSbtc: totalSBTC,
          subtotalBtc: totalBTC,
          subtotalSbtc: totalSBTC,
          priceUSD: totalBTC * 25000 
        }
      ],
    };
    addTransaction(newTransaction);
    return newTransaction;
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        transactions,
        updateBalance,
        addTransaction,
        processPayment,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

