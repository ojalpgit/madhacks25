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

  const processPayment = (merchant, amount, items = []) => {
    // Use provided items or create a default item
    const transactionItems = items.length > 0
      ? items.map((item) => ({
          name: item.name || 'Item',
          price: item.price || 0,
          priceUSD: (item.price || 0) * 25000,
        }))
      : [{ name: 'Payment', price: amount, priceUSD: amount * 25000 }];

    const newTransaction = {
      id: Date.now().toString(),
      type: 'sent',
      merchant,
      amount,
      amountUSD: amount * 25000,
      date: new Date().toISOString(),
      status: 'confirmed',
      confirmations: 0,
      items: transactionItems,
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

