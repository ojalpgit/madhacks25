# Fix "Could Not Connect to Server" Error

## Quick Fix (Try This First!)

**Use tunnel mode** - This works even if your phone and computer are on different networks:

```bash
npm run start:tunnel
```

Or directly:
```bash
expo start --tunnel
```

## Common Solutions

### 1. Tunnel Mode (Most Reliable)
```bash
npm run start:tunnel
```
This creates a tunnel through Expo's servers, so it works even on different networks.

### 2. Same Wi-Fi Network
- Make sure your phone and computer are on the **same Wi-Fi network**
- Try restarting your Wi-Fi router
- Disable VPN if you're using one

### 3. Clear Cache and Restart
```bash
npm run start:clear
```

### 4. Check Firewall
- Temporarily disable firewall to test
- Allow Expo through firewall settings
- Ports needed: 19000, 19001, 19002

### 5. Manual Connection in Expo Go
1. Open Expo Go app
2. Tap "Enter URL manually"
3. Type the URL shown in your terminal (starts with `exp://`)

### 6. Use LAN Mode Explicitly
```bash
npm run start:lan
```

### 7. Check Your IP Address
In the terminal where Expo is running, you'll see something like:
```
Metro waiting on exp://192.168.1.100:8081
```
Make sure this IP matches your computer's local IP address.

### 8. Update Expo Go App
- Make sure you have the latest Expo Go app from App Store/Play Store
- Update if needed

### 9. Try Different Connection Method
- If scanning QR code doesn't work, try typing the URL manually
- Or use the "Enter URL manually" option in Expo Go

## Step-by-Step Troubleshooting

1. **First, try tunnel mode:**
   ```bash
   npm run start:tunnel
   ```
   Wait for it to generate a new QR code, then scan it.

2. **If that doesn't work, try clearing cache:**
   ```bash
   npm run start:clear
   ```

3. **Check network:**
   - Both devices on same Wi-Fi?
   - Try disconnecting and reconnecting Wi-Fi on both devices

4. **Manual URL entry:**
   - Copy the `exp://` URL from terminal
   - Open Expo Go → Enter URL manually → Paste URL

## Still Not Working?

1. Restart your computer
2. Restart your phone
3. Reinstall Expo Go app
4. Check Expo status: https://status.expo.dev/

## Alternative: Use USB Connection (iOS only)

If you have a Mac and iPhone:
```bash
npm run ios
```
This connects via USB cable and bypasses network issues.

