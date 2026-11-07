import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import BooksBrowser from '../Book/BooksBrowser';
import PageSurface from '../Main/PageSurface';
import { DisciplineBooks } from '../../types';

/**
 * Книги одной дисциплины учебной группы студента.
 *
 * Набор книг совпадает с GET /api/books: бэкенд отдаёт только те книги
 * дисциплины, которые закреплены за группой пользователя. Дисциплина
 * другой группы неотличима от несуществующей (404).
 */
export default function DisciplineBooksPage() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<DisciplineBooks | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadBooks = useCallback(() => {
        setLoading(true);
        setError(null);
        setNotFound(false);

        axios.get<DisciplineBooks>(`/api/disciplines/${id}/books`)
            .then((response) => setData(response.data))
            .catch((requestError) => {
                if (axios.isAxiosError(requestError) && requestError.response?.status === 404) {
                    setNotFound(true);
                } else {
                    setError('Не удалось загрузить книги по дисциплине.');
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const title = data?.discipline.disciplinename ?? 'Дисциплина';
    const books = data?.books ?? [];

    return (
        <PageSurface
            title={title}
            description="Учебники и пособия по выбранной дисциплине."
        >
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            ) : null}

            {!loading && notFound ? (
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
                    Дисциплина не найдена или недоступна для вашей группы.
                </Typography>
            ) : null}

            {!loading && error ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error" role="alert" gutterBottom>
                        {error}
                    </Typography>
                    <Button onClick={loadBooks}>Повторить</Button>
                </Box>
            ) : null}

            {!loading && !notFound && !error && books.length === 0 ? (
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
                    По этой дисциплине пока нет книг.
                </Typography>
            ) : null}

            {!loading && !notFound && !error && books.length > 0 ? (
                <BooksBrowser books={books} />
            ) : null}
        </PageSurface>
    );
}
