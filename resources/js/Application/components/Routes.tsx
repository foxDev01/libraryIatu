import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import IRoutesProps from '../interfaces/IRoutesProps';

import LoginView from './Auth/LoginView';
import RegisterView from './Auth/RegisterView';
import BooksPage from './Book/BooksPage';
import AboutPage from './pages/AboutPage';
import AddNewQuestion from './pages/AddNewQuestion';
import SupportPage from './Support/SupportPage';

const Routes: React.FC<IRoutesProps> = ({ auth, setAuth }) => {
    return (
        <Switch>
            <Route
                path="/login"
                render={(props) => <LoginView auth={auth} setAuth={setAuth} {...props} />}
            />

            {!auth && (
                <Route
                    path="/register"
                    render={(props) => <RegisterView auth={auth} setAuth={setAuth} {...props} />}
                />
            )}

            {auth && <Route component={BooksPage} path="/" exact />}
            {auth && <Route component={AddNewQuestion} path="/add_new" />}
            {auth && <Route component={AboutPage} path="/about" />}
            {auth && <Route component={SupportPage} path="/support" />}

            <Redirect to={auth ? '/' : '/login'} />
        </Switch>
    );
};

export default Routes;
