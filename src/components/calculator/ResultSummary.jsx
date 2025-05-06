// src/components/calculator/ResultSummary.jsx
import { useContext } from 'react';
import { Paper, Typography, Box, Grid, Divider } from '@mui/material';
import { CurrencyContext } from '../../context/CurrencyContext';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import Loader from '../common/Loader';
import { formatCurrency } from '../../utils/formatters';

const ResultSummary = ({ loanAmount, interestRate, loanTerm, emi }) => {
  const { selectedCurrency } = useContext(CurrencyContext);
  const { rates, loading, error, convertAmount } = useExchangeRates('USD');

  const totalPayment = emi * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  // Calculate converted values for all monetary amounts
  const convertedEmi = selectedCurrency !== 'USD' && !loading && !error && rates && rates[selectedCurrency]
    ? convertAmount(emi, selectedCurrency)
    : null;

  const convertedLoanAmount = selectedCurrency !== 'USD' && !loading && !error && rates && rates[selectedCurrency]
    ? convertAmount(loanAmount, selectedCurrency)
    : null;

  const convertedTotalInterest = selectedCurrency !== 'USD' && !loading && !error && rates && rates[selectedCurrency]
    ? convertAmount(totalInterest, selectedCurrency)
    : null;

  const convertedTotalPayment = selectedCurrency !== 'USD' && !loading && !error && rates && rates[selectedCurrency]
    ? convertAmount(totalPayment, selectedCurrency)
    : null;

  // Helper function to format currency with the correct code
  const formatWithCurrency = (amount, isConverted) => {
    if (selectedCurrency === 'USD' || !isConverted) {
      return formatCurrency(amount, 'USD');
    } else {
      return formatCurrency(amount, selectedCurrency);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Loan Summary
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Loan Amount
          </Typography>
          <Typography variant="h6">
            {selectedCurrency === 'USD' || convertedLoanAmount === null
              ? formatCurrency(loanAmount, 'USD')
              : formatCurrency(convertedLoanAmount, selectedCurrency)}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Interest Rate
          </Typography>
          <Typography variant="h6">
            {interestRate}% per annum
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Loan Term
          </Typography>
          <Typography variant="h6">
            {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Interest
          </Typography>
          <Typography variant="h6">
            {selectedCurrency === 'USD' || convertedTotalInterest === null
              ? formatCurrency(totalInterest, 'USD')
              : formatCurrency(convertedTotalInterest, selectedCurrency)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography variant="subtitle1" color="text.secondary">
                Monthly Payment (EMI)
              </Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                {selectedCurrency === 'USD' || convertedEmi === null
                  ? formatCurrency(emi, 'USD')
                  : formatCurrency(convertedEmi, selectedCurrency)}
              </Typography>
            </Box>

            {selectedCurrency !== 'USD' && (
              <Box sx={{ textAlign: 'right', flexGrow: 1, minWidth: '200px' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  EMI in {selectedCurrency}
                </Typography>
                {loading ? (
                  <Loader message="Converting..." />
                ) : error ? (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    Could not convert: {error}
                  </Typography>
                ) : convertedEmi !== null ? (
                  <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(convertedEmi, selectedCurrency)}
                  </Typography>
                ) : (
                  <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
                    Rate for {selectedCurrency} unavailable.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" color="text.secondary">
            Total Payment
          </Typography>
          <Typography variant="h5">
            {selectedCurrency === 'USD' || convertedTotalPayment === null
              ? formatCurrency(totalPayment, 'USD')
              : formatCurrency(convertedTotalPayment, selectedCurrency)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultSummary;