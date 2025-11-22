# Bitcoin Payment Mobile App

A customer-facing Bitcoin payment mobile application built with React Native and Expo. This app allows customers to pay merchants using Bitcoin by scanning QR codes.

## Features

- **Bitcoin Wallet**: Display Bitcoin balance, scaled balance (satoshis), and USD equivalent
- **QR Code Scanning**: Scan merchant QR codes to initiate payments
- **Payment Confirmation**: Secure payment confirmation flow with transaction details
- **Transaction History**: View complete transaction history with itemized purchase details
- **Profile Management**: User profile settings, wallet address, and preferences
- **Modern UI**: Clean, trust-inducing interface with smooth animations

## Tech Stack

- **React Native** with **Expo**
- **React Navigation** for navigation
- **Expo Camera** and **BarCode Scanner** for QR code scanning
- **React Native Animatable** for smooth animations
- **Context API** for state management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Project Structure

```
├── App.js                 # Main app entry point with navigation
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── DashboardCard.js
│   │   ├── PayButton.js
│   │   └── TransactionCard.js
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.js
│   │   ├── ScanScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── SettingsScreen.js
│   │   └── TransactionDetailScreen.js
│   ├── context/          # Context providers
│   │   └── WalletContext.js
│   └── utils/            # Utility functions
│       ├── colors.js
│       └── wallet.js
└── package.json
```

## Key Features

### Home Screen
- Displays Bitcoin balance in BTC, satoshis, and USD
- Quick access buttons for History, Settings, and Receive
- Recent transactions preview
- Large "Pay" button for easy access

### Scan Screen
- Full-screen camera view for QR code scanning
- Overlay with scanning frame
- Payment confirmation modal with merchant details
- Success animation after payment

### Profile Screen
- Complete transaction history
- Wallet address display
- Quick access to settings

### Settings Screen
- Profile information (name, email, wallet address)
- Security settings (notifications, 2FA, PIN)
- Preferences (currency, language, theme)
- App information and support

### Transaction Detail Screen
- Detailed transaction information
- Itemized purchase list
- Transaction status and confirmations
- Copy transaction ID functionality

## Design

The app uses the **Modern Crypto** color palette:
- Primary: Deep Blue (#1A1F71)
- Accent: Bright Orange (#FF9900)
- Background: Light Gray (#F5F5F5)
- Secondary: White (#FFFFFF)

## Mock Data

The app currently uses mock data for:
- Wallet balance and transactions
- Bitcoin to USD conversion rate (set to $25,000/BTC)
- QR code parsing (supports Bitcoin payment URIs)

## Future Enhancements

- Integration with real Bitcoin wallet (Bitcoin.js or similar)
- Backend API integration for merchant sync
- Real-time transaction updates
- Push notifications
- Biometric authentication
- Multiple wallet support
- Bitcoin testnet/mainnet switching

## Notes

- The app is currently configured for development with mock data
- Camera permissions are required for QR code scanning
- Bitcoin wallet functionality uses placeholder implementations
- Transaction history is stored in local state (ready for backend integration)

## License

This project is built for demonstration purposes.

