import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import BooksList from './BooksList';
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
                        <Button onClick={loadBooks}>Повторить</Button>
                    </>
                ) : null}

                {!loading && !error && books.length === 0 ? (
                    <Typography>Для вашей группы пока нет книг.</Typography>
                ) : null}

                {!loading && !error && books.length > 0 ? (
                    <BooksList books={books} />
                ) : null}
            </Paper>
        </Box>
    );
}
