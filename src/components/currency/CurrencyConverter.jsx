// src/components/currency/CurrencyConverter.jsx
import { useState, useContext, useEffect } from 'react';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Box,
  Alert // Import Alert for better error display
} from '@mui/material';
import { CurrencyContext } from '../../context/CurrencyContext';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import Loader from '../common/Loader';

const CurrencyConverter = () => {
  const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);
  const { rates, loading, error } = useExchangeRates('USD'); // Base currency is USD
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    if (rates && Object.keys(rates).length > 0 && !error) { // Only populate if no error
      const currencyList = Object.keys(rates).sort();
      setCurrencies(currencyList);
      // Ensure selectedCurrency is valid if rates change
      if (!currencyList.includes(selectedCurrency) && currencyList.includes('USD')) {
        setSelectedCurrency('USD');
      } else if (!currencyList.includes(selectedCurrency) && currencyList.length > 0) {
        setSelectedCurrency(currencyList[0]); // Fallback to the first available
      }
    } else if (!loading && !error && Object.keys(rates).length === 0) {
      // Handle case where API returns success but no rates (shouldn't happen with this API)
      setCurrencies([]);
    }
  }, [rates, error, loading, selectedCurrency, setSelectedCurrency]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Display Currency
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Loader message="Loading currencies..." />
      ) : error ? (
        // Use MUI Alert for a more prominent error message
        <Alert severity="error" sx={{ mt: 1 }}>
          Error loading currencies: {error}
        </Alert>
      ) : currencies.length === 0 ? (
        <Alert severity="warning" sx={{ mt: 1 }}>
          No currencies available to display.
        </Alert>
      ) : (
        <Box>
          <FormControl fullWidth>
            <InputLabel id="currency-select-label">Select Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={selectedCurrency}
              label="Select Currency" // Make sure label matches InputLabel
              onChange={handleCurrencyChange}
            >
              {/* Ensure USD is always an option if available, or a prominent one */}
              {currencies.includes('USD') && (
                <MenuItem key="USD" value="USD">
                  USD (US Dollar)
                </MenuItem>
              )}
              {currencies.filter(c => c !== 'USD').map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
            Live exchange rates from ExchangeRate-API.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CurrencyConverter;