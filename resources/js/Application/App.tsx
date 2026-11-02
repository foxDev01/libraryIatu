import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import NavBar from './components/NavBar/NavBar';
import Index from './components/Main/Index';
import ThemeToggle from './components/ThemeToggle';
import { SessionProvider } from './session';
import { AppThemeProvider } from './theme';

const App: React.FC = () => {
  // null means "session status is still being checked".
  const [auth, setAuth] = useState<boolean | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    axios.get<{ authenticated: boolean }>('/api/session')
      .then((response) => {
        if (!cancelled) {
          setAuth(response.data.authenticated);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuth(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppThemeProvider>
      {auth === null ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <SessionProvider value={{ auth, setAuth }}>
          {auth ? (
            <NavBar open={open} onToggleDrawer={() => setOpen(!open)} />
          ) : (
            // Guest pages have no app bar, so the switch floats in the corner.
            <ThemeToggle sx={{ position: 'fixed', top: 8, right: 8, zIndex: 1200 }} />
          )}
          <Index open={open}>
            <Outlet />
          </Index>
        </SessionProvider>
      )}
    </AppThemeProvider>
  );
};

export default App;
