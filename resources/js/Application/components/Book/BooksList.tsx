import React from 'react';
import Box from '@mui/material/Box';

import { Book } from '../../types';
import BookCard from './Book';

const BooksList: React.FC<{ books: Book[] }> = ({ books }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                alignContent: 'start',
                overflow: 'auto',
                flexGrow: 1,
            }}
        >
            {books.map(({ id, bookname, link }) => (
                <BookCard key={id} id={id} bookname={bookname} link={link} />
            ))}
        </Box>
    );
};

export default BooksList;
