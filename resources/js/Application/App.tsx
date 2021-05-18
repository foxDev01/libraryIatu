import React, { useEffect } from 'react';

import Index from "./components/Main/Index";
import NavBar from "./components/NavBar/NavBar";
import Routes from './components/Routes';
import Cookies from 'js-cookie';

const App: React.FC = () =>
{

  const [auth, setAuth] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (Cookies.get('user_logged_in') == 'true') {
        setAuth(true);
    };
  }, []);

  const handleDrawer = () => {
    let status = !open;
    setOpen(status);
  };

  return(
    <>  
        {auth
        ? <NavBar open={open} setAuth={setAuth} auth={auth} handleDrawer={handleDrawer} />
        : null}
        <Index open={open}>
          <Routes auth={auth} setAuth={setAuth}/>
        </Index>
    </>
  );
};

export default App;