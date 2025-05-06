// src/hooks/useExchangeRates.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Access environment variables or use fallback
const API_KEY =
  import.meta.env.VITE_EXCHANGE_RATE_API_KEY || "022303b250e509648e3d38c7";
const BASE_URL =
  import.meta.env.VITE_EXCHANGE_RATE_API_BASE_URL ||
  "https://v6.exchangerate-api.com/v6";

export const useExchangeRates = (baseCurrency = "USD") => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async (currency) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/${API_KEY}/latest/${currency}`
      );
      if (response.data.result === "success") {
        setRates(response.data.conversion_rates);
      } else {
        setError(
          response.data["error-type"] ||
            "Failed to fetch exchange rates from API."
        );
        console.error("API Error:", response.data["error-type"]);
      }
    } catch (err) {
      let errorMessage = "Error connecting to exchange rate service.";
      if (err.response) {
        errorMessage = `API request failed: ${err.response.status} ${err.response.statusText}`;
        if (err.response.data && err.response.data["error-type"]) {
          errorMessage += ` - ${err.response.data["error-type"]}`;
        }
        console.error("API Response Error:", err.response.data);
      } else if (err.request) {
        errorMessage =
          "No response from exchange rate service. Check network connection.";
        console.error("API No Response Error:", err.request);
      } else {
        console.error("API Setup Error:", err.message);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(baseCurrency);
  }, [baseCurrency, fetchRates]);

  const convertAmount = useCallback(
    (amount, targetCurrency) => {
      if (!rates || !rates[targetCurrency]) return null;
      return amount * rates[targetCurrency];
    },
    [rates]
  );

  return { rates, loading, error, fetchRates, convertAmount };
};
