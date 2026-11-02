import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function AddNewQuestion() {
    const navigate = useNavigate();
    const started = useRef<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Protect against double invocation (React strict mode, remounts).
        if (started.current) {
            return;
        }
        started.current = true;

        axios.post('/api/questions')
            .then(() => navigate('/support', { replace: true }))
            .catch(() => setError('Не удалось создать вопрос. Попробуйте ещё раз.'));
    }, [navigate]);

    if (error) {
        return (
            <Typography color="error" role="alert">
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 6, justifyContent: 'center' }}>
            <CircularProgress size={24} />
            <Typography sx={{ color: 'text.secondary' }}>Создание вопроса…</Typography>
        </Box>
    );
}
