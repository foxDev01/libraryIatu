import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Book } from '../../types';

const Book: React.FC<Book> = (props) => {
    return (
        <Card sx={{ minWidth: 150, m: '5px', bgcolor: '#FFFFFF' }} data-book-id={props.id}>
            <CardContent>
                <Typography color="textPrimary" variant="h3" sx={{ fontSize: 18 }} align="left">
                    {props.bookname}
                </Typography>
                <Typography variant="body2" component="p" align="left">
                    <a href={props.link} target="_blank" rel="noopener noreferrer">
                        Скачать
                    </a>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Book;
