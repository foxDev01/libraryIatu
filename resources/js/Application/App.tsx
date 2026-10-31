import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import NavBar from './components/NavBar/NavBar';
import Index from './components/Main/Index';
import { SessionProvider } from './session';

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

  if (auth === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const context = {
    auth: auth,
    setAuth: (value: boolean) => setAuth(value),
  };

  return (
    <SessionProvider value={context}>
      {auth ? <NavBar open={open} onToggleDrawer={() => setOpen(!open)} /> : null}
      <Index open={open}>
        <Outlet />
      </Index>
    </SessionProvider>
  );
};

export default App;
