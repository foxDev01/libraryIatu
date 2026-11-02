import React from 'react';
import type { ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Copyright from './includes/Copyright';

interface AuthCardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
}

/**
 * Общая «карточка» для гостевых страниц: вход, регистрация,
 * восстановление и сброс пароля.
 */
const AuthCard: React.FC<AuthCardProps> = ({ title, icon, children }) => {
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
                    {icon ? <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>{icon}</Avatar> : null}
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    {children}
                </Box>
            </Paper>
            <Box sx={{ mt: 3 }}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default AuthCard;
