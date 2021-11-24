import { Alert, Snackbar } from '@mui/material';

export function AppError({ error }) {
  return (
    <main className="app">
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </main>
  );
}
