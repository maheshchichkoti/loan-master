// src/hooks/useAmortizationSchedule.js
import { useMemo } from "react";

export const useAmortizationSchedule = (principal, annualRate, months, emi) => {
  return useMemo(() => {
    if (!principal || !annualRate || !months || !emi) {
      return [];
    }

    const monthlyRate = annualRate / 12 / 100;
    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;

      schedule.push({
        month,
        emi: emi.toFixed(2),
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      });

      if (balance <= 0) break;
    }

    return schedule;
  }, [principal, annualRate, months, emi]);
};
