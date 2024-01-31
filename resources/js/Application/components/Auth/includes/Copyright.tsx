import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
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