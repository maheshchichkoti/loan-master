// src/hooks/useEmiCalculator.js
import { useState, useCallback } from "react";

export const useEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEmi = useCallback(() => {
    // EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 12 / 100;
    const months = parseInt(loanTerm);

    if (principal > 0 && monthlyRate > 0 && months > 0) {
      const numerator =
        principal * monthlyRate * Math.pow(1 + monthlyRate, months);
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      const calculatedEmi = numerator / denominator;
      setEmi(calculatedEmi);
      return calculatedEmi;
    } else {
      setEmi(0);
      return 0;
    }
  }, [loanAmount, interestRate, loanTerm]);

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emi,
    calculateEmi,
  };
};
