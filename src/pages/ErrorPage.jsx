// src/pages/ErrorPage.jsx
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body1" paragraph>
          We're sorry, but there was an error loading this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          Go to Home Page
        </Button>
      </Paper>
    </Container>
  );
};

export default ErrorPage;