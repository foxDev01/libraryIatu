import React from 'react';
import { Link, Typography } from '@mui/material';

const Copyright = () => {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }} align="center">
            {'©'}
            <Link color="inherit" href="http://iatu.ulstu.ru/">
                ИАТУ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;
