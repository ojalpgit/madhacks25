# Quick Fix for TurboModuleRegistry Error

## Immediate Solution

Run these commands in order:

```bash
# 1. Stop the current server (Ctrl+C if running)

# 2. Clear everything
rm -rf node_modules
rm -rf .expo
npm cache clean --force

# 3. Reinstall
npm install

# 4. Start with cleared cache
expo start -c
```

## If Using iOS Simulator

After the above, if still getting error:

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

## Alternative: Use Web Preview (No Native Modules)

If you just want to see the UI:

```bash
npm run web
```

This bypasses all native module issues.

## What Caused This?

- Native modules (like expo-constants) weren't properly linked
- Cache corruption
- Version mismatch between Expo SDK and packages

The fix above reinstalls everything fresh and clears all caches.

