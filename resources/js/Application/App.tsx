import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import Index from "./components/Main/Index";
import NavBar from "./components/NavBar/NavBar";
import Routes from './components/Routes';

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

  const handleDrawer = () => {
    setOpen(!open);
  };

  if (auth === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {auth
        ? <NavBar open={open} setAuth={setAuth} auth={auth} handleDrawer={handleDrawer} />
        : null}
      <Index open={open}>
        <Routes auth={auth} setAuth={setAuth} />
      </Index>
    </>
  );
};

export default App;
