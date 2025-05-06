// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as AppThemeProvider } from './context/ThemeContext'; // Updated import
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/common/Header';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import ExchangeRates from './pages/ExchangeRates';
import NotFound from './components/common/NotFound';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppThemeProvider>
        <CurrencyProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/exchange-rates" element={<ExchangeRates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CurrencyProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  );
}

export default App;