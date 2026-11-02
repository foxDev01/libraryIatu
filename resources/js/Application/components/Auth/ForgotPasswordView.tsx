import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import AuthCard from './AuthCard';
import apiErrorMessage from '../../apiError';

/**
 * Запрос ссылки для восстановления пароля.
 *
 * Ответ сервера всегда нейтральный, поэтому и текст на экране один и тот же
 * независимо от того, зарегистрирован адрес или нет.
 */
const ForgotPasswordView: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [sent, setSent] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setSent(false);
        setLoading(true);

        axios.get('/sanctum/csrf-cookie')
            .then(() => axios.post('/api/forgot-password', { email: email }))
            .then(() => setSent(true))
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось отправить письмо. Попробуйте ещё раз.'));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <AuthCard title="Восстановление пароля" icon={<LockResetOutlinedIcon />}>
            <Box component="form" sx={{ width: '100%', mt: 1 }} noValidate onSubmit={handleSubmit}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Укажите email, который вы использовали при регистрации. Мы отправим ссылку для смены пароля.
                </Typography>

                {sent ? (
                    <Alert severity="success" sx={{ mb: 1 }}>
                        Если такой адрес зарегистрирован, письмо со ссылкой отправлено. Проверьте почту.
                    </Alert>
                ) : null}

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
                    autoFocus
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Отправляем…' : 'Отправить ссылку'}
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        <RouterLink to="/login">Вернуться ко входу</RouterLink>
                    </Typography>
                </Box>
            </Box>
        </AuthCard>
    );
};

export default ForgotPasswordView;
