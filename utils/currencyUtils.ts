export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    // Fallback if Intl is not supported
    return `${getCurrencySymbol(currency)}${amount.toLocaleString()}`;
  }
}

export function getCurrencySymbol(currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'INR': '₹',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'Fr',
    'CNY': '¥',
    'HKD': 'HK$',
    'SGD': 'S$',
    'SEK': 'kr',
    'KRW': '₩',
    'NOK': 'kr',
    'NZD': 'NZ$',
    'MXN': 'Mex$',
    'BRL': 'R$',
    'RUB': '₽',
    'ZAR': 'R',
    'TRY': '₺',
  };
  
  return symbols[currency] || '$';
}

export function parseAmountString(amountString: string): number {
  // Remove currency symbols and other non-numeric characters
  const numericString = amountString.replace(/[^0-9.-]+/g, '');
  return parseFloat(numericString);
}