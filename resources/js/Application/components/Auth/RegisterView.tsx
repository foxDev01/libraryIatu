import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Copyright from './includes/Copyright';
import useStyles from './includes/styles';
import IRegisterViewProps from '../../interfaces/IRegisterViewProps';
import apiErrorMessage from '../../apiError';

interface GroupNameOption {
    id: number;
    groupname: string;
}

const RegisterView: React.FC<IRegisterViewProps> = ({ auth, setAuth, history }) => {
    const classes = useStyles();

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
                history.push('/');
            })
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось зарегистрироваться.'));
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
                    Регистрация
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        {loading ? 'Регистрируем…' : 'Зарегистрироваться'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to="/login">
                                Уже есть аккаунт? Войти
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

export default withRouter(RegisterView);
