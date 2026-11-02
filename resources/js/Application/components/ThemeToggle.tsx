import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import type { SxProps, Theme } from '@mui/material/styles';

import { useColorMode } from '../theme';

const ThemeToggle: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
    const { mode, toggleColorMode } = useColorMode();
    const label = mode === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';

    return (
        <Tooltip title={label} arrow>
            <IconButton
                onClick={toggleColorMode}
                color="inherit"
                aria-label={label}
                sx={sx}
            >
                {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;
