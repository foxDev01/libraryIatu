import React from 'react';
import { Redirect, Route, Switch} from 'react-router-dom';

import IRoutesProps from '../interfaces/IRoutesProps';

import LoginView from "./Auth/LoginView";
import RegisterView from "./Auth/RegisterView";
import AddNewIdea from "./pages/AddNewQuestion";
import BooksPage from "./Book/BooksPage";
import AboutPage from "./pages/AboutPage";
import { Divider } from '@material-ui/core';
import SupportPage from './Support/SupportPage';
import AddNewQuestion from './pages/AddNewQuestion';


const Routes: React.FC<IRoutesProps> = ({auth, setAuth}) => {
    return (
      <Switch>
        <Route path="/login" component={
          (props: JSX.IntrinsicAttributes) =>
          <LoginView auth={auth} setAuth={setAuth} {...props} />
        } />

        <Route path="/register" component={
          (props: JSX.IntrinsicAttributes) =>
          <RegisterView auth={auth} setAuth={setAuth} {...props} />
        } />

        {
          auth
          ?
          <>
            <Route component={BooksPage} path="/" exact />
            <Route component={AddNewQuestion} path="/add_new"  />
            <Route component={AboutPage} path="/about" />
            <Route component={SupportPage} path="/support"  />

          </>
          :
          <Redirect to='/login' />
        }
      </Switch>
    )
}

export default Routes;
