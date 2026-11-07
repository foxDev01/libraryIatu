import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import BooksBrowser from './BooksBrowser';
import PageSurface from '../Main/PageSurface';
import { Book as BookType } from '../../types';

export default function BooksPage() {
    const [books, setBooks] = useState<BookType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadBooks = useCallback(() => {
        setLoading(true);
        setError(null);

        axios.get<BookType[]>('/api/books')
            .then((response) => setBooks(response.data))
            .catch(() => setError('Не удалось загрузить книги.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    return (
        <PageSurface
            title="Книги"
            description="Учебники и пособия, подобранные для вашей группы."
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
                    <Button onClick={loadBooks}>Повторить</Button>
                </Box>
            ) : null}

            {!loading && !error && books.length === 0 ? (
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
                    Для вашей группы пока нет книг.
                </Typography>
            ) : null}

            {!loading && !error && books.length > 0 ? (
                <BooksBrowser books={books} />
            ) : null}
        </PageSurface>
    );
}
