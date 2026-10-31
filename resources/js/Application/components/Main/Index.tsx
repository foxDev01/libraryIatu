import React from 'react';
import { Box } from '@mui/material';

const drawerWidth = 240;

const Index: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: (transitionTheme) => transitionTheme.transitions.create('margin', {
                        easing: open
                            ? transitionTheme.transitions.easing.easeOut
                            : transitionTheme.transitions.easing.sharp,
                        duration: open
                            ? transitionTheme.transitions.duration.enteringScreen
                            : transitionTheme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Index;
