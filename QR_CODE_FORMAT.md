# QR Code Transaction Format

## Valid QR Code Formats

The app accepts QR codes in JSON format with transaction details. Here are examples:

### Basic Transaction Format

```json
{
  "merchant": "Coffee Shop",
  "amount": 0.001,
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
}
```

### Transaction with Items

```json
{
  "merchant": "Restaurant",
  "amount": 0.003,
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "items": [
    {
      "name": "Burger",
      "price": 0.0015
    },
    {
      "name": "Fries",
      "price": 0.0008
    },
    {
      "name": "Drink",
      "price": 0.0007
    }
  ],
  "description": "Dinner order #1234"
}
```

### Alternative Field Names (Also Supported)

- `merchant` or `merchantName` - Merchant name
- `amount` - Transaction amount in BTC
- `address` or `walletAddress` - Bitcoin wallet address
- `items` or `itemized` - Array of items
- `description` or `memo` - Transaction description

## Required Fields

- `merchant` or `merchantName` - Must be present
- `amount` - Must be a positive number

## Optional Fields

- `address` - Bitcoin wallet address
- `items` - Array of itemized purchases
- `description` - Transaction description/memo
- `timestamp` - Transaction timestamp

## Validation Rules

1. **Merchant**: Must be a non-empty string
2. **Amount**: Must be a positive number (BTC)
3. **Items**: If provided, each item should have:
   - `name` (optional)
   - `price` (in BTC)

## Invalid QR Codes

The app will show an error for:
- Empty or null QR codes
- Non-JSON format (unless it's a Bitcoin URI)
- Missing required fields (merchant, amount)
- Invalid amount (negative, zero, or NaN)
- Malformed JSON

## Example Test QR Codes

### Valid Example 1:
```json
{"merchant":"Coffee Shop","amount":0.001}
```

### Valid Example 2:
```json
{"merchant":"Tech Store","amount":0.002,"items":[{"name":"USB Cable","price":0.002}]}
```

### Invalid Example (Missing Amount):
```json
{"merchant":"Coffee Shop"}
```

### Invalid Example (Negative Amount):
```json
{"merchant":"Coffee Shop","amount":-0.001}
```

## Testing

To test the QR code scanning:
1. Generate a QR code with one of the valid JSON formats above
2. Scan it with the app
3. The app will validate and show transaction details
4. Invalid QR codes will show an error message

