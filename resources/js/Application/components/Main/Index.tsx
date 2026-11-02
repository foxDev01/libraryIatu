import React from 'react';
import { Box } from '@mui/material';

const drawerWidth = 240;

const Index: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
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
