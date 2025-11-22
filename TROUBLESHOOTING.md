# Troubleshooting Expo Connection Issues

## "Could not connect to server" Error

This error typically occurs when your phone cannot reach the Expo development server. Here are solutions:

### Solution 1: Use Tunnel Mode (Recommended)

If your phone and computer are on different networks, use tunnel mode:

```bash
expo start --tunnel
```

Or modify your package.json script:
```json
"start": "expo start --tunnel"
```

### Solution 2: Check Network Connection

1. **Same Wi-Fi Network**: Ensure your phone and computer are on the same Wi-Fi network
2. **Firewall**: Check if your firewall is blocking the connection
3. **Network Restrictions**: Some corporate/school networks block local connections

### Solution 3: Use LAN Mode Explicitly

```bash
expo start --lan
```

### Solution 4: Check Your Computer's IP Address

1. Find your computer's local IP address:
   - **Mac/Linux**: Run `ifconfig | grep "inet "` in terminal
   - **Windows**: Run `ipconfig` in command prompt
2. Make sure the IP shown in Expo matches your computer's IP

### Solution 5: Clear Cache and Restart

```bash
expo start -c
```

### Solution 6: Use Expo Go App Directly

Instead of scanning QR code:
1. Open Expo Go app on your phone
2. Manually enter the connection URL shown in terminal
3. Or use the "Enter URL manually" option in Expo Go

### Solution 7: Check Port Availability

Make sure ports 19000, 19001, 19002 are not blocked by firewall.

### Solution 8: Update Expo CLI

```bash
npm install -g expo-cli@latest
```

Or if using npx:
```bash
npx expo-cli@latest start
```

### Solution 9: Use Development Build (Advanced)

If issues persist, consider creating a development build:
```bash
expo install expo-dev-client
```

### Quick Fix Checklist

- [ ] Phone and computer on same Wi-Fi
- [ ] Firewall allows connections
- [ ] Try tunnel mode: `expo start --tunnel`
- [ ] Clear cache: `expo start -c`
- [ ] Restart Expo server
- [ ] Update Expo Go app on phone
- [ ] Try manual URL entry in Expo Go

### Alternative: Use Physical Cable (iOS)

For iOS devices, you can connect via USB:
1. Connect iPhone to Mac via USB
2. Run `expo start --ios`
3. This bypasses network issues

