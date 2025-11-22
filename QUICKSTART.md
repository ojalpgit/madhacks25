# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (install globally: `npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```
   This will open Expo DevTools in your browser.

3. **Run on Your Device**
   - **iOS**: Press `i` in the terminal or scan the QR code with your iPhone camera
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web**: Press `w` in the terminal (limited functionality - camera won't work)

## Testing QR Code Scanning

To test the QR code scanning feature, you can generate a test QR code with the following format:

```
bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.001&label=Test%20Merchant
```

Or use any Bitcoin address:
```
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

## App Structure

- **Home Tab**: Dashboard with balance and recent transactions
- **Scan Tab**: QR code scanner for payments
- **Profile Tab**: Transaction history and settings

## Features to Test

1. **View Balance**: Check the home screen for BTC balance, satoshis, and USD equivalent
2. **Scan QR Code**: Tap "Pay" button or go to Scan tab, scan a QR code
3. **Confirm Payment**: Review payment details and confirm
4. **View Transactions**: Check profile tab for transaction history
5. **Transaction Details**: Tap any transaction to see itemized details
6. **Settings**: Access profile settings from the profile screen

## Troubleshooting

### Camera Permission Issues
- Make sure you've granted camera permissions in your device settings
- On iOS: Settings > Privacy > Camera > Expo Go
- On Android: Settings > Apps > Expo Go > Permissions > Camera

### QR Code Not Scanning
- Ensure good lighting
- Hold the device steady
- Make sure the QR code is within the scanning frame
- Try generating a new QR code with higher contrast

### App Not Starting
- Clear cache: `expo start -c`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Notes

- The app uses mock data for demonstration
- Bitcoin conversion rate is set to $25,000/BTC (mock)
- Transactions are stored in local state (not persisted)
- Camera functionality requires a physical device (won't work in web/emulator)

