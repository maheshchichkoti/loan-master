// src/pages/Home.jsx
import React from 'react'; // Always good to import React
import { Container, Typography, Paper, Box, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useAppTheme } from '../context/ThemeContext'; // Import your theme hook

const Home = () => {
  const { mode } = useAppTheme(); // Get the current theme mode

  const heroPaperStyles = {
    p: { xs: 3, md: 6 },
    textAlign: 'center',
    mb: 4,
    color: 'text.primary', // This will adapt with the theme
    // Conditional background:
    ...(mode === 'light'
      ? {
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }
      : {
        backgroundImage: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      }),
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={heroPaperStyles} // Apply the dynamic styles
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Loan Calculator App
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Calculate loan EMIs, view amortization schedules, and convert currencies in real-time
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/calculator"
          startIcon={<CalculateIcon />}
          sx={{ mt: 2 }}
        >
          Start Calculating
        </Button>
      </Paper>

      {/* The rest of the component remains the same */}
      {/* ... feature cards ... */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' /* bgcolor: 'background.paper' is default */ }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalculateIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5">
                Loan EMI Calculator
              </Typography>
            </Box>
            <Typography paragraph>
              Calculate your Equated Monthly Installment (EMI) based on loan amount, interest rate, and tenure.
              View a detailed amortization schedule showing principal and interest breakdowns for each payment.
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/calculator"
            >
              Calculate EMI
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' /* bgcolor: 'background.paper' is default */ }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CurrencyExchangeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5">
                Currency Conversion
              </Typography>
            </Box>
            <Typography paragraph>
              Convert your EMI to over 160 currencies using real-time exchange rates.
              Browse current exchange rates and see how your loan payments translate to different currencies.
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/exchange-rates"
            >
              View Exchange Rates
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;