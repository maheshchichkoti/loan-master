// src/context/ThemeContext.jsx
import React, { createContext, useState, useMemo, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create and export the context directly with this name for backward compatibility
export const ThemeContext = createContext(undefined);

// Export the provider with the original name
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const storedTheme = localStorage.getItem('appTheme');
    return (storedTheme === 'dark' || storedTheme === 'light') ? storedTheme : 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem('appTheme', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? { // Light Mode Palette
              primary: { main: '#1976d2' },
              secondary: { main: '#dc004e' },
              background: { default: '#f4f6f8', paper: '#ffffff' },
              text: { primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)' },
            }
            : { // Dark Mode Palette
              primary: { main: '#90caf9' },
              secondary: { main: '#f48fb1' },
              background: { default: '#121212', paper: '#1e1e1e' },
              text: { primary: '#ffffff', secondary: 'rgba(255, 255, 255, 0.7)' },
            }),
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                textTransform: 'none',
                ...(ownerState.variant === 'contained' &&
                  ownerState.color === 'primary' &&
                  theme.palette.mode === 'dark' && {
                  // Custom styles for dark mode if needed
                }),
              }),
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              }
            }
          }
        }
      }),
    [mode]
  );

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Also export the hook for modern usage
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};