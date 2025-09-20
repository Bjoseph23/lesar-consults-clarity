// Currency configuration and conversion utilities
// These rates are approximate and should be updated by site owner as needed

export const currencyConfig = {
  conversionRates: {
    // Approximate rates - update as needed by site owner
    KES_to_USD: 140, // 1 USD = ~140 KES (approximate)
    ZAR_to_USD: 18.9, // 1 USD = ~18.9 ZAR (approximate)
  }
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const convertToUSD = (amount: number, fromCurrency: string): number => {
  const rates = currencyConfig.conversionRates;
  
  switch (fromCurrency.toUpperCase()) {
    case 'KES':
      return Math.round(amount / rates.KES_to_USD);
    case 'ZAR':
      return Math.round(amount / rates.ZAR_to_USD);
    default:
      return amount; // Assume already in USD
  }
};

export const formatPercentage = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return `${numValue}%`;
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};