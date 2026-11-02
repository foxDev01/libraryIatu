import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import PageSurface from '../Main/PageSurface';
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
        <PageSurface
            title="Помощь"
            description="Ваши вопросы в поддержку библиотеки."
        >
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            ) : null}

            {!loading && error ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error" role="alert" gutterBottom>
                        {error}
                    </Typography>
                    <Button onClick={loadQuestions}>Повторить</Button>
                </Box>
            ) : null}

            {!loading && !error && questions.length === 0 ? (
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
                    У вас пока нет вопросов.
                </Typography>
            ) : null}

            {!loading && !error && questions.length > 0 ? (
                <SupportList questions={questions} onChanged={loadQuestions} />
            ) : null}
        </PageSurface>
    );
}
