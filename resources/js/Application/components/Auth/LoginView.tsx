import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Copyright from './includes/Copyright';
import useStyles from './includes/styles';
import ILoginViewProps from '../../interfaces/ILoginViewProps';
import apiErrorMessage from '../../apiError';

const LoginView: React.FC<ILoginViewProps> = ({ auth, setAuth, history }) => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        axios.get('/sanctum/csrf-cookie')
            .then(() => axios.post('/api/login', {
                email: email,
                password: password,
                remember: remember,
            }))
            .then(() => {
                setAuth(true);
                history.push('/');
            })
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось войти. Проверьте email и пароль.'));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (auth) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                checked={remember}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRemember(event.target.checked)}
                            />
                        }
                        label="Запомнить меня"
                    />
                    {error ? (
                        <Typography color="error" variant="body2" role="alert">
                            {error}
                        </Typography>
                    ) : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        {loading ? 'Входим…' : 'Войти'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to="/register">
                                Нет аккаунта? Зарегистрироваться
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default withRouter(LoginView);
