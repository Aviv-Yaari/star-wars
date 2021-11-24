import { LinearProgress } from '@mui/material';

export function AppLoading() {
  return (
    <main className="app">
      <div className="loading-container">
        <LinearProgress color="secondary" />
        <p>Loading..</p>
        <p>API might be slow sometimes, May the force be with you</p>
      </div>
    </main>
  );
}
