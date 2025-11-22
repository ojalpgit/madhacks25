# Fix: Legacy Expo CLI Issue

## Problem

You're using the old global `expo-cli` which doesn't support newer features.

## Solution: Use Local Expo CLI

Instead of `expo`, use `npx expo`:

### Correct Commands:

```bash
# Clear cache and start
npx expo start -c

# Or use npm scripts (now updated)
npm run start:clear

# Start normally
npx expo start

# Start with tunnel
npx expo start --tunnel
```

## Remove Global Expo CLI (Optional)

If you want to remove the old global version:

```bash
npm uninstall -g expo-cli
```

But you don't need to - just use `npx expo` instead of `expo`.

## Quick Fix

Run this now:

```bash
npx expo start -c
```

This uses the local Expo CLI that comes with your project.

## All Updated Commands

I've updated your `package.json` scripts to use `npx expo`, so you can also use:

```bash
npm start          # Uses npx expo start
npm run start:clear # Uses npx expo start -c
npm run ios        # Uses npx expo start --ios
npm run web        # Uses npx expo start --web
```

## Why This Happens

- Old way: `npm install -g expo-cli` (global, outdated)
- New way: `npx expo` (local, always latest, comes with project)

The new Expo CLI is included in your `node_modules` and is always compatible with your project version.

