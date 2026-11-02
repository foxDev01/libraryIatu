import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import { Book } from '../../types';

const Book: React.FC<Book> = (props) => {
    const { id, bookname, link, has_file: hasFile } = props;

    // Файлы отдаёт наш контроллер (проверяет группу), внешние ссылки — напрямую.
    const href = hasFile ? `/api/books/${id}/download` : link;

    return (
        <Card
            variant="outlined"
            data-book-id={id}
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
                    {bookname}
                </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                {href ? (
                    <Button
                        size="small"
                        variant="outlined"
                        component="a"
                        href={href}
                        target={hasFile ? undefined : '_blank'}
                        rel={hasFile ? undefined : 'noopener noreferrer'}
                        endIcon={<DownloadOutlinedIcon />}
                    >
                        Скачать
                    </Button>
                ) : (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Файл ещё не загружен
                    </Typography>
                )}

                {href && !hasFile ? (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        внешняя ссылка
                    </Typography>
                ) : null}
            </CardActions>
        </Card>
    );
};

export default Book;
