import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface PageSurfaceProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

/**
 * Shared page container: a themed surface with a heading, so every page
 * looks the same in the light and the dark palette.
 */
const PageSurface: React.FC<PageSurfaceProps> = ({ title, description, children }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Box>
                <Typography variant="h5" component="h1" gutterBottom>
                    {title}
                </Typography>
                {description ? (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                ) : null}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
                {children}
            </Box>
        </Paper>
    );
};

export default PageSurface;
