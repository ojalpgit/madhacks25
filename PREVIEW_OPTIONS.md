# Alternative Ways to Preview Your App

If QR code scanning isn't working, here are several ways to preview your Bitcoin Payment app:

## Option 1: Web Preview (Quickest - Limited Features)

Run the app in your web browser:

```bash
npm run web
```

**Note:** Camera/QR scanning won't work in web, but you can see the UI and navigate through screens.

## Option 2: iOS Simulator (Mac Only)

If you have a Mac with Xcode installed:

```bash
npm run ios
```

This will:
- Open iOS Simulator automatically
- Install and run the app
- Full functionality (including camera simulation)

**Requirements:**
- Mac computer
- Xcode installed (from App Store)
- iOS Simulator (comes with Xcode)

## Option 3: Android Emulator

If you have Android Studio installed:

```bash
npm run android
```

This will:
- Open Android Emulator
- Install and run the app
- Full functionality

**Requirements:**
- Android Studio installed
- Android Emulator set up
- Or connect a physical Android device via USB

## Option 4: USB Connection (iOS - Mac Only)

Connect your iPhone to Mac via USB cable:

```bash
npm run ios
```

This bypasses network issues and connects directly via USB.

## Option 5: Manual URL Entry in Expo Go

Instead of scanning QR code:

1. Start the server:
   ```bash
   npm start
   ```

2. Look for a URL in the terminal like:
   ```
   exp://192.168.1.100:8081
   ```

3. Open Expo Go app on your phone

4. Tap "Enter URL manually"

5. Type or paste the URL from terminal

## Option 6: Expo Snack (Online Preview)

1. Go to https://snack.expo.dev
2. Copy your code files
3. Preview in browser (limited functionality)

## Option 7: Development Build

For full native features, create a development build:

```bash
# Install dev client
npx expo install expo-dev-client

# Build for iOS (requires Apple Developer account)
eas build --profile development --platform ios

# Build for Android
eas build --profile development --platform android
```

## Recommended Options by Platform

### If you have a Mac:
1. **Best:** iOS Simulator (`npm run ios`)
2. **Quick:** Web preview (`npm run web`)
3. **Physical device:** USB connection (`npm run ios` with iPhone connected)

### If you have Windows/Linux:
1. **Best:** Android Emulator (`npm run android`)
2. **Quick:** Web preview (`npm run web`)
3. **Physical device:** USB connection with Android phone

### Quickest Preview (Any Platform):
```bash
npm run web
```
Opens in browser immediately - great for UI testing!

## Testing Camera Features

**Important:** Camera/QR scanning only works on:
- Physical devices (iOS/Android)
- iOS Simulator (with camera simulation)
- Android Emulator (with camera simulation)

**Won't work on:**
- Web browser
- Expo Snack

## Step-by-Step: iOS Simulator (Mac)

1. Install Xcode from App Store (if not installed)
2. Open Xcode → Preferences → Components → Download iOS Simulator
3. Run: `npm run ios`
4. Wait for simulator to open and app to load

## Step-by-Step: Android Emulator

1. Install Android Studio
2. Open Android Studio → Tools → AVD Manager
3. Create a virtual device (e.g., Pixel 5)
4. Run: `npm run android`
5. Wait for emulator to open and app to load

## Quick Test Commands

```bash
# Web (fastest, no setup needed)
npm run web

# iOS Simulator (Mac only, full features)
npm run ios

# Android Emulator (full features)
npm run android
```

