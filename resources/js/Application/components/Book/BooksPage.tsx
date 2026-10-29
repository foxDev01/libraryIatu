import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import BooksList from './BooksList';
import { Book as BookType } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
      height: '500px',
      padding: '10px',
      margin: '3px',
      backgroundColor: '#91CEEE',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      position: 'relative',
      height: '100%',
      backgroundColor: '#DDDDFF',
    },
    grid: {
      position: 'relative',
      height: '100%',
    },
  }),
);

export default function BooksPage() {
    const classes = useStyles();
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
        <div className={classes.root}>
            <Grid className={classes.grid} container spacing={3}>
                <Grid className={classes.grid} item xs>
                    <Paper className={classes.paper}>
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
                </Grid>
            </Grid>
        </div>
    );
}
