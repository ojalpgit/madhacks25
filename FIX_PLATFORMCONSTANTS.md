# Fix PlatformConstants TurboModuleRegistry Error

## Complete Fix Steps

This error occurs when native modules aren't properly linked. Follow these steps **in order**:

### Step 1: Stop the Server
Press `Ctrl+C` in the terminal to stop the current server.

### Step 2: Complete Clean
```bash
# Remove all caches and build files
rm -rf node_modules
rm -rf .expo
rm -rf ios/build
rm -rf android/build
npm cache clean --force
```

### Step 3: Reinstall Dependencies
```bash
npm install
```

### Step 4: Verify expo-constants is Installed
```bash
npm list expo-constants
```

Should show: `expo-constants@~14.4.2`

### Step 5: Clear Metro Cache and Start
```bash
expo start -c --reset-cache
```

## Alternative: Use Web Preview (No Native Modules)

If the error persists, use web preview which doesn't require native modules:

```bash
npm run web
```

This will show the UI (camera won't work, but you can see everything else).

## If Using iOS Simulator

After the above steps, if still getting error:

```bash
# Clean iOS build
cd ios
rm -rf build
pod deintegrate
pod install
cd ..

# Rebuild
npm run ios
```

## If Using Physical Device with Expo Go

1. Close Expo Go app completely
2. Clear Expo Go cache (Settings → Expo Go → Clear Cache)
3. Restart Expo Go
4. Scan QR code again

## Nuclear Option: Full Reset

If nothing works:

```bash
# Stop server
# Delete everything
rm -rf node_modules .expo ios android
npm cache clean --force

# Reinstall
npm install

# Start fresh
expo start -c
```

## Quick Check: Verify Installation

Run this to check if expo-constants is properly installed:

```bash
npm list | grep expo-constants
```

If it's not listed, install it:

```bash
npx expo install expo-constants
```

## Most Likely Solution

The issue is usually cache-related. Try this first:

```bash
# Stop server (Ctrl+C)
expo start -c --reset-cache
```

If that doesn't work, do the full clean (Step 2-5 above).

