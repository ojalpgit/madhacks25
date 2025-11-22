// Bitcoin wallet utilities and mock data

// Mock wallet data
export const mockWallet = {
  address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  balance: 0.025, // BTC
  scaledBalance: 25000000, // Satoshis
  usdEquivalent: 625.00, // USD (assuming $25,000/BTC)
};

// Mock transactions
export const mockTransactions = [
  {
    id: '1',
    type: 'sent',
    merchant: 'Coffee Shop',
    amount: 0.001,
    amountUSD: 25.00,
    date: '2024-01-15T10:30:00Z',
    status: 'confirmed',
    confirmations: 3,
    items: [
      { name: 'Espresso', price: 0.0005, priceUSD: 12.50 },
      { name: 'Croissant', price: 0.0005, priceUSD: 12.50 },
    ],
  },
  {
    id: '2',
    type: 'sent',
    merchant: 'Tech Store',
    amount: 0.002,
    amountUSD: 50.00,
    date: '2024-01-14T15:20:00Z',
    status: 'confirmed',
    confirmations: 6,
    items: [
      { name: 'USB Cable', price: 0.002, priceUSD: 50.00 },
    ],
  },
  {
    id: '3',
    type: 'received',
    merchant: 'Payment',
    amount: 0.01,
    amountUSD: 250.00,
    date: '2024-01-13T09:15:00Z',
    status: 'confirmed',
    confirmations: 12,
    items: [],
  },
  {
    id: '4',
    type: 'sent',
    merchant: 'Restaurant',
    amount: 0.003,
    amountUSD: 75.00,
    date: '2024-01-12T19:45:00Z',
    status: 'confirmed',
    confirmations: 24,
    items: [
      { name: 'Burger', price: 0.0015, priceUSD: 37.50 },
      { name: 'Fries', price: 0.0008, priceUSD: 20.00 },
      { name: 'Drink', price: 0.0007, priceUSD: 17.50 },
    ],
  },
];

// Format Bitcoin amount
export const formatBTC = (amount) => {
  return `${amount.toFixed(8)} BTC`;
};

// Format USD amount
export const formatUSD = (amount) => {
  return `$${amount.toFixed(2)}`;
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate USD equivalent (mock rate)
export const getUSDEquivalent = (btcAmount) => {
  const btcToUSD = 25000; // Mock rate
  return btcAmount * btcToUSD;
};

// Parse QR code data - expects JSON format with transaction details
export const parseQRCode = (qrData) => {
  if (!qrData || typeof qrData !== 'string') {
    throw new Error('Invalid QR code: Empty or invalid data');
  }

  try {
    // Try to parse as JSON first
    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch (jsonError) {
      // If not JSON, try Bitcoin URI format
      if (qrData.startsWith('bitcoin:')) {
        const parts = qrData.split('?');
        const address = parts[0].replace('bitcoin:', '');
        const params = new URLSearchParams(parts[1] || '');
        parsedData = {
          address,
          amount: parseFloat(params.get('amount') || '0'),
          merchant: params.get('label') || 'Unknown Merchant',
        };
      } else {
        throw new Error('Invalid QR code format: Must be JSON or Bitcoin URI');
      }
    }

    // Validate required fields for JSON format
    if (typeof parsedData === 'object' && parsedData !== null) {
      // Check if it's a transaction JSON
      if (!parsedData.merchant && !parsedData.merchantName) {
        throw new Error('Invalid transaction: Missing merchant information');
      }

      if (parsedData.amount === undefined || parsedData.amount === null) {
        throw new Error('Invalid transaction: Missing amount');
      }

      const amount = parseFloat(parsedData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid transaction: Amount must be a positive number');
      }

      // Build transaction object
      const transaction = {
        merchant: parsedData.merchant || parsedData.merchantName || 'Unknown Merchant',
        amount: amount,
        address: parsedData.address || parsedData.walletAddress || '',
        items: parsedData.items || parsedData.itemized || [],
        description: parsedData.description || parsedData.memo || '',
        timestamp: parsedData.timestamp || new Date().toISOString(),
      };

      return transaction;
    }

    throw new Error('Invalid QR code: Data is not a valid transaction object');
  } catch (error) {
    // Re-throw with clear error message
    if (error.message) {
      throw error;
    }
    throw new Error('Invalid QR code: Unable to parse transaction data');
  }
};

// Validate transaction data structure
export const validateTransaction = (transaction) => {
  const errors = [];

  if (!transaction.merchant || transaction.merchant.trim() === '') {
    errors.push('Merchant name is required');
  }

  if (transaction.amount === undefined || transaction.amount === null) {
    errors.push('Amount is required');
  } else if (isNaN(transaction.amount) || transaction.amount <= 0) {
    errors.push('Amount must be a positive number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

