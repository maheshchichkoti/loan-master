// src/components/calculator/LoanForm.jsx
import { useContext } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Slider,
  Grid,
  Paper
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext';
import { useEmiCalculator } from '../../hooks/useEmiCalculator';

const LoanForm = ({ onCalculate }) => {
  const { mode } = useContext(ThemeContext);
  const {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    calculateEmi
  } = useEmiCalculator();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emi = calculateEmi();
    onCalculate({
      loanAmount,
      interestRate,
      loanTerm,
      emi
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        bgcolor: mode === 'dark' ? 'background.paper' : '#fff'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Loan Calculator
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom>Loan Amount</Typography>
            <TextField
              fullWidth
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              InputProps={{ inputProps: { min: 1000 } }}
              variant="outlined"
            />
            <Slider
              value={typeof loanAmount === 'number' ? loanAmount : 100000}
              onChange={(_, value) => setLoanAmount(value)}
              min={1000}
              max={1000000}
              step={1000}
              aria-labelledby="loan-amount-slider"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Interest Rate (%)</Typography>
            <TextField
              fullWidth
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              InputProps={{ inputProps: { min: 0.1, max: 30, step: 0.1 } }}
              variant="outlined"
            />
            <Slider
              value={typeof interestRate === 'number' ? interestRate : 5}
              onChange={(_, value) => setInterestRate(value)}
              min={0.1}
              max={30}
              step={0.1}
              aria-labelledby="interest-rate-slider"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Loan Term (months)</Typography>
            <TextField
              fullWidth
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              InputProps={{ inputProps: { min: 1, max: 360 } }}
              variant="outlined"
            />
            <Slider
              value={typeof loanTerm === 'number' ? loanTerm : 12}
              onChange={(_, value) => setLoanTerm(value)}
              min={1}
              max={360}
              step={1}
              aria-labelledby="loan-term-slider"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Calculate EMI
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoanForm;