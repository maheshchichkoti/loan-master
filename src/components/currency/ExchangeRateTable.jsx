// src/components/currency/ExchangeRateTable.jsx
import { useState, useEffect } from 'react';
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
  TextField,
  InputAdornment,
  Divider,
  Box,
  Alert // Import Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import Loader from '../common/Loader';

const ExchangeRateTable = () => {
  const { rates, loading, error } = useExchangeRates('USD');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayRates, setDisplayRates] = useState([]); // Renamed from filteredRates for clarity

  useEffect(() => {
    if (rates && Object.keys(rates).length > 0 && !error) {
      const ratesArray = Object.entries(rates).map(([currency, rate]) => ({
        currency,
        rate
      }));

      const filtered = ratesArray.filter(item =>
        item.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // Potentially add search by currency name if you have that data
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setDisplayRates(filtered.sort((a, b) => a.currency.localeCompare(b.currency)));
    } else {
      setDisplayRates([]); // Clear rates if error or no rates
    }
  }, [rates, searchTerm, error]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Loader message="Loading exchange rates..." />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Exchange Rates
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Alert severity="error">
          Error loading exchange rates: {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Exchange Rates
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Current exchange rates against USD. {displayRates.length} currencies shown.
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search currency code (e.g., EUR, JPY)..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {displayRates.length === 0 && !loading && (
        <Typography sx={{ textAlign: 'center', my: 3 }}>
          No exchange rates to display.
        </Typography>
      )}

      {displayRates.length > 0 && (
        <>
          <TableContainer>
            <Table size="small" aria-label="exchange rates table">
              <TableHead>
                <TableRow>
                  <TableCell>Currency Code</TableCell>
                  <TableCell align="right">Rate (1 USD = X CUR)</TableCell>
                  {/* Removed redundant "1 USD Equals" as it's same as rate */}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayRates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.currency}>
                      <TableCell component="th" scope="row">
                        {row.currency}
                      </TableCell>
                      <TableCell align="right">{row.rate.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, { label: `All (${displayRates.length})`, value: displayRates.length > 0 ? displayRates.length : -1 }]}
            component="div"
            count={displayRates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </>
      )}
    </Paper>
  );
};

export default ExchangeRateTable;