import React from 'react';
import Box from '@mui/material/Box';
import { Book } from '../../types';
import BookCard from './Book';

const BooksList: React.FC<{ books: Book[] }> = ({ books }) => {
    return (
        <Box sx={{ maxHeight: '100%', overflow: 'auto', flexGrow: 1 }}>
            {books.map(({ id, bookname, link }) => (
                <BookCard key={id} id={id} bookname={bookname} link={link} />
            ))}
        </Box>
    );
};

export default BooksList;
