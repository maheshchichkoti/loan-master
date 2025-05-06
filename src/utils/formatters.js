// src/utils/formatters.js

/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currencyCode - The ISO currency code (e.g., 'USD', 'EUR'). Defaults to 'USD'.
 * @param {string} locale - The locale for formatting (e.g., 'en-US'). Defaults to 'en-US'.
 * @returns {string} The formatted currency string, or a placeholder if formatting fails.
 */
export const formatCurrency = (
  amount,
  currencyCode = "USD",
  locale = "en-US"
) => {
  const numAmount = parseFloat(amount);

  if (typeof numAmount !== "number" || isNaN(numAmount)) {
    // console.warn(`Invalid amount for currency formatting: ${amount}. Returning $0.00 as placeholder.`);
    // Return a default formatted value for invalid inputs to avoid breaking the UI
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD", // Always use a valid fallback currency
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  } catch (error) {
    // This catch block handles cases where the currencyCode might be invalid for Intl.NumberFormat
    // console.warn(`Failed to format currency for ${currencyCode}, falling back to USD formatting. Error: ${error.message}`);
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD", // Fallback to a known valid currency like USD
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount); // Format the original amount but with USD
  }
};

/**
 * Formats a date object, string, or number into a more readable date string.
 * Example: formatDate(new Date(), 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
 * @param {Date|string|number} dateInput - The date to format.
 * @param {string} locale - The locale for formatting. Defaults to 'en-US'.
 * @param {Intl.DateTimeFormatOptions} options - Formatting options.
 * @returns {string} The formatted date string, or the original input if formatting fails.
 */
export const formatDate = (dateInput, locale = "en-US", options) => {
  try {
    const date = new Date(dateInput);
    // Check if the date is valid after parsing
    if (isNaN(date.getTime())) {
      // console.warn(`Invalid dateInput for formatting: ${dateInput}`);
      return String(dateInput); // Return original input if date is invalid
    }

    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
      date
    );
  } catch (error) {
    // console.warn(`Failed to format date: ${dateInput}`, error);
    return String(dateInput); // Fallback to string representation of the original input
  }
};

// You can add other general-purpose formatters here as needed.
// For example, a simple number formatter:
/**
 * Formats a number with a specified number of decimal places.
 * @param {number} number - The number to format.
 * @param {number} decimalPlaces - The number of decimal places. Defaults to 2.
 * @returns {string} The formatted number string.
 */
export const formatNumber = (number, decimalPlaces = 2) => {
  const num = parseFloat(number);
  if (isNaN(num)) {
    return String(number); // Or 'N/A', or '0.00'
  }
  return num.toFixed(decimalPlaces);
};
