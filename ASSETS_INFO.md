# Assets Information

## Current Status

The app is configured to work **without custom assets**. Expo will use default icons and splash screens.

## Optional: Adding Custom Assets

If you want to add custom assets later, create these files in the `assets/` folder:

### Required Sizes:

1. **icon.png** - 1024x1024px (app icon)
2. **splash.png** - 1242x2436px (splash screen)
3. **adaptive-icon.png** - 1024x1024px (Android adaptive icon)
4. **favicon.png** - 48x48px (web favicon)

### To Enable Custom Assets:

Update `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1A1F71"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1A1F71"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## For Now

The app works perfectly fine without custom assets. Expo provides default icons and splash screens automatically.

