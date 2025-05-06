// src/pages/Calculator.jsx
import { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import LoanForm from '../components/calculator/LoanForm';
import ResultSummary from '../components/calculator/ResultSummary';
import AmortizationTable from '../components/calculator/AmortizationTable';
import CurrencyConverter from '../components/currency/CurrencyConverter';

const Calculator = () => {
  const [calculationResult, setCalculationResult] = useState(null);

  const handleCalculate = (result) => {
    setCalculationResult(result);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LoanForm onCalculate={handleCalculate} />

          {calculationResult && (
            <ResultSummary
              loanAmount={calculationResult.loanAmount}
              interestRate={calculationResult.interestRate}
              loanTerm={calculationResult.loanTerm}
              emi={calculationResult.emi}
            />
          )}

          {calculationResult && (
            <AmortizationTable
              loanAmount={calculationResult.loanAmount}
              interestRate={calculationResult.interestRate}
              loanTerm={calculationResult.loanTerm}
              emi={calculationResult.emi}
            />
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <CurrencyConverter />
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <h3>EMI Formula Used</h3>
            <p>EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</p>
            <p>Where:</p>
            <ul>
              <li>P = Principal loan amount</li>
              <li>R = Monthly interest rate (annual rate / 12 / 100)</li>
              <li>N = Loan duration in months</li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calculator;