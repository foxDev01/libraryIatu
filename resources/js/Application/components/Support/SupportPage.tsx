import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import SupportList from './SupportList';
import { Question } from '../../types';

export default function SupportPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadQuestions = useCallback(() => {
        setLoading(true);
        setError(null);

        axios.get<Question[]>('/api/questions')
            .then((response) => setQuestions(response.data))
            .catch(() => setError('Не удалось загрузить вопросы.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                position: 'relative',
                height: '500px',
                padding: '10px',
                margin: '3px',
                backgroundColor: '#91CEEE',
            }}
        >
            <Paper
                sx={{
                    p: 2,
                    textAlign: 'center',
                    color: 'text.secondary',
                    position: 'relative',
                    height: '100%',
                    backgroundColor: '#DDDDFF',
                }}
            >
                {loading ? <CircularProgress /> : null}

                {!loading && error ? (
                    <>
                        <Typography color="error" role="alert">{error}</Typography>
                        <Button onClick={loadQuestions}>Повторить</Button>
                    </>
                ) : null}

                {!loading && !error && questions.length === 0 ? (
                    <Typography>У вас пока нет вопросов.</Typography>
                ) : null}

                {!loading && !error && questions.length > 0 ? (
                    <SupportList questions={questions} onChanged={loadQuestions} />
                ) : null}
            </Paper>
        </Box>
    );
}
