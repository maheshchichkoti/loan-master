// src/components/calculator/AmortizationTable.jsx
import { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Divider
} from '@mui/material';
import { useAmortizationSchedule } from '../../hooks/useAmortizationSchedule';

const AmortizationTable = ({ loanAmount, interestRate, loanTerm, emi }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const schedule = useAmortizationSchedule(loanAmount, interestRate, loanTerm, emi);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Amortization Schedule
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="right">EMI</TableCell>
              <TableCell align="right">Principal</TableCell>
              <TableCell align="right">Interest</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.month}>
                  <TableCell component="th" scope="row">
                    {row.month}
                  </TableCell>
                  <TableCell align="right">{formatCurrency(row.emi)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.principal)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.interest)}</TableCell>
                  <TableCell align="right">{formatCurrency(row.balance)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={schedule.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AmortizationTable;