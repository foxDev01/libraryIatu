import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Copyright from './includes/Copyright';
import apiErrorMessage from '../../apiError';
import { useSession } from '../../session';

const LoginView: React.FC = () => {
    const { auth, setAuth } = useSession();
    const navigate = useNavigate();
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
                navigate('/');
            })
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось войти. Проверьте email и пароль.'));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ py: { xs: 4, sm: 8 } }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    border: 1,
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" sx={{ width: '100%', mt: 1 }} noValidate onSubmit={handleSubmit}>
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
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Входим…' : 'Войти'}
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <NavLink to="/register">
                                Нет аккаунта? Зарегистрироваться
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <Box sx={{ mt: 3 }}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default LoginView;
