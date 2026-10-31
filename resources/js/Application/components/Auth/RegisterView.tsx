import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Copyright from './includes/Copyright';
import apiErrorMessage from '../../apiError';
import { useSession } from '../../session';
import { GroupNameOption } from '../../types';

const RegisterView: React.FC = () => {
    const { auth, setAuth } = useSession();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [groups, setGroups] = useState<GroupNameOption[]>([]);
    const [groupNameId, setGroupNameId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false;

        axios.get<GroupNameOption[]>('/api/group-names')
            .then((response) => {
                if (!cancelled) {
                    setGroups(response.data);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setGroups([]);
                    setError('Не удалось загрузить список групп.');
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (!groupNameId) {
            setError('Выберите группу.');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('Пароли не совпадают.');
            return;
        }

        setLoading(true);

        axios.get('/sanctum/csrf-cookie')
            .then(() => axios.post('/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                group_name_id: Number(groupNameId),
            }))
            .then(() => {
                setAuth(true);
                navigate('/');
            })
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось зарегистрироваться.'));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" sx={{ width: '100%', mt: 1 }} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Имя"
                        name="name"
                        autoFocus
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                    />
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
                        select
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="group_name_id"
                        label="Группа"
                        name="group_name_id"
                        value={groupNameId}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGroupNameId(event.target.value)}
                    >
                        {groups.map((group) => (
                            <MenuItem key={group.id} value={String(group.id)}>
                                {group.groupname}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
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
                        {loading ? 'Регистрируем…' : 'Зарегистрироваться'}
                    </Button>
                    <Box sx={{ display: 'flex' }}>
                        <NavLink to="/login">
                            Уже есть аккаунт? Войти
                        </NavLink>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 8 }}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default RegisterView;
