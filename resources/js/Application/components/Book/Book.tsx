import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import { Book } from '../../types';

const Book: React.FC<Book> = (props) => {
    return (
        <Card
            variant="outlined"
            data-book-id={props.id}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']),
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 3,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600 }}>
                    {props.bookname}
                </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                    size="small"
                    variant="outlined"
                    component="a"
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<DownloadOutlinedIcon />}
                >
                    Скачать
                </Button>
            </CardActions>
        </Card>
    );
};

export default Book;
