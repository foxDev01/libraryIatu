import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import AuthCard from './AuthCard';
import apiErrorMessage from '../../apiError';

/**
 * Установка нового пароля по ссылке из письма.
 *
 * Токен и email приходят в query-параметрах: /reset-password?token=…&email=…
 */
const ResetPasswordView: React.FC = () => {
    const [params] = useSearchParams();
    const token = params.get('token') ?? '';
    const [email, setEmail] = useState<string>(params.get('email') ?? '');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (password !== passwordConfirmation) {
            setError('Пароли не совпадают.');
            return;
        }

        setLoading(true);

        axios.get('/sanctum/csrf-cookie')
            .then(() => axios.post('/api/reset-password', {
                token: token,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            }))
            .then(() => setDone(true))
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(
                    requestError,
                    'Не удалось изменить пароль. Ссылка могла устареть — запросите новую.',
                ));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (!token) {
        return (
            <AuthCard title="Ссылка не найдена" icon={<LinkOffOutlinedIcon />}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                    В адресе нет токена восстановления пароля. Запросите новое письмо.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/forgot-password"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Запросить ссылку
                </Button>
            </AuthCard>
        );
    }

    if (done) {
        return (
            <AuthCard title="Пароль обновлён" icon={<LockResetOutlinedIcon />}>
                <Alert severity="success" sx={{ my: 2, width: '100%' }}>
                    Пароль изменён. Войдите с новым паролем.
                </Alert>
                <Button
                    component={RouterLink}
                    to="/login"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                >
                    Перейти ко входу
                </Button>
            </AuthCard>
        );
    }

    return (
        <AuthCard title="Новый пароль" icon={<LockResetOutlinedIcon />}>
            <Box component="form" sx={{ width: '100%', mt: 1 }} noValidate onSubmit={handleSubmit}>
                {error ? (
                    <Alert severity="error" sx={{ mb: 1 }} role="alert">
                        {error}
                    </Alert>
                ) : null}

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
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Новый пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    helperText="Минимум 8 символов"
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Повторите пароль"
                    type="password"
                    id="password_confirmation"
                    autoComplete="new-password"
                    value={passwordConfirmation}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Сохраняем…' : 'Сменить пароль'}
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        <RouterLink to="/forgot-password">Запросить другую ссылку</RouterLink>
                    </Typography>
                </Box>
            </Box>
        </AuthCard>
    );
};

export default ResetPasswordView;
