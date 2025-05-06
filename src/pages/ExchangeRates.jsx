// src/pages/ExchangeRates.jsx
import { Container, Typography, Box } from '@mui/material';
import ExchangeRateTable from '../components/currency/ExchangeRateTable';

const ExchangeRates = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Currency Exchange Rates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View current exchange rates for over 160 currencies against USD.
          These rates are fetched in real-time from the ExchangeRate-API.
        </Typography>
      </Box>

      <ExchangeRateTable />
    </Container>
  );
};

export default ExchangeRates;