# Fix TurboModuleRegistry Error

## Error: 'PlatformConstants' could not be found

This error occurs when native modules are out of sync. Here's how to fix it:

## Solution 1: Clear Cache and Restart (Try This First)

```bash
# Stop the current server (Ctrl+C)
# Then run:
npm run start:clear
```

Or manually:
```bash
expo start -c
```

## Solution 2: Full Clean and Reinstall

```bash
# Stop the server
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Clear Expo cache
expo start -c
```

## Solution 3: Reset Metro Bundler Cache

```bash
# Stop server
# Clear watchman (if installed)
watchman watch-del-all

# Clear Metro cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*

# Restart
expo start -c
```

## Solution 4: Rebuild Native Code (iOS Simulator)

If using iOS Simulator:

```bash
# Stop server
# Clean build folder
cd ios
xcodebuild clean
cd ..

# Rebuild
npm run ios
```

## Solution 5: Use Expo Dev Client

If the error persists, you may need to use Expo Dev Client:

```bash
# Install dev client
npx expo install expo-dev-client

# Rebuild
npx expo run:ios
# or
npx expo run:android
```

## Solution 6: Check Expo SDK Version Compatibility

Make sure all packages are compatible with Expo SDK 49:

```bash
# Check for incompatible packages
npx expo-doctor

# Fix issues
npx expo install --fix
```

## Solution 7: Reset Everything (Nuclear Option)

```bash
# Stop server
# Delete everything
rm -rf node_modules
rm -rf .expo
rm -rf ios/build
rm -rf android/build

# Reinstall
npm install

# Clear all caches
expo start -c --reset-cache
```

## Quick Fix Checklist

1. ✅ Stop the current server (Ctrl+C)
2. ✅ Run: `npm run start:clear`
3. ✅ If that doesn't work: Delete `node_modules` and reinstall
4. ✅ If still failing: Try `npx expo-doctor` to check for issues

## Most Common Fix

**Just clear cache and restart:**

```bash
expo start -c
```

This fixes the issue 90% of the time!

