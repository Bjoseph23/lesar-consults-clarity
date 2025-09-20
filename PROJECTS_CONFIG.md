# Projects Configuration Guide

## Currency Display

The projects page displays USD as the primary currency with local currencies shown as secondary information where applicable.

### Currency Configuration

Edit `src/lib/currency.ts` to update conversion rates:

```typescript
export const currencyConfig = {
  conversionRates: {
    KES_to_USD: 140, // 1 USD = ~140 KES (approximate)
    ZAR_to_USD: 18.9, // 1 USD = ~18.9 ZAR (approximate)
  }
};
```

**Note:** These rates are approximate and should be updated by the site owner as needed.

## Project Data Structure

### Value Fields

Projects can use any of these value fields in `data/projects.json`:

- `value_original`: For projects with USD values from PDF
- `value_original_local`: For projects with local currency (KES, ZAR, etc.)
- `value_usd`: Optional precomputed USD value (overrides conversion)
- `tender_value_original` & `tender_value_usd`: For tender analysis projects

### Metrics Configuration

Each project's metrics array supports:

```json
{
  "metrics": [
    {
      "label": "Metric description",
      "value": "15%" or "$50,000" or "100,000+",
      "type": "Reported" | "Estimated" | "Projected"
    }
  ]
}
```

**Types:**
- `Reported`: Data directly from PDF/official sources
- `Estimated`: Conservative projections for display
- `Projected`: Future-looking estimates

## Editing Project Data

1. Open `src/data/projects.json`
2. Update metrics values and types as needed
3. Adjust currency conversion rates in `src/lib/currency.ts`
4. All metrics marked "Estimated" include disclaimer text automatically

## Display Rules

- Primary currency: USD (formatted with $ symbol)
- Local currency shown in parentheses when available
- Conversion rates marked as "approx." when computed
- Badge colors: Green (Reported), Blue (Estimated), Purple (Projected)
- Conservative language used throughout interface