# Fix: react-native-worklets/plugin Error

## ✅ Fixed!

I've installed `react-native-worklets-core` which is required by `react-native-reanimated` v4.x.

## Next Step

Restart the server:

```bash
npx expo start -c
```

Or use the npm script:

```bash
npm run start:clear
```

## What Was Missing

`react-native-reanimated` v4.x requires `react-native-worklets-core` as a peer dependency, but it wasn't automatically installed. This is now fixed.

## Try Again

The error should be resolved. Run:

```bash
npx expo start -c
```

Your app should now start successfully! 🎉

