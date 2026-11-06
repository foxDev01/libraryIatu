import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import { Book } from '../../types';

const Book: React.FC<Book> = (props) => {
    const { id, bookname, link, has_file: hasFile, has_cover: hasCover } = props;
    const [imageFailed, setImageFailed] = React.useState(false);

    // Файлы отдаёт наш контроллер (проверяет группу), внешние ссылки — напрямую.
    const href = hasFile ? `/api/books/${id}/download` : link;
    const coverUrl = hasCover && !imageFailed ? `/api/books/${id}/cover` : null;

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
            <Box
                data-cover={coverUrl === null ? 'placeholder' : undefined}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 200,
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                    overflow: 'hidden',
                    mx: 1,
                    mt: 1,
                    backgroundColor: 'action.hover',
                    color: coverUrl === null ? 'text.secondary' : undefined,
                }}
            >
                {coverUrl !== null ? (
                    <img
                        src={coverUrl}
                        alt={bookname}
                        loading="lazy"
                        onError={() => setImageFailed(true)}
                        referrerPolicy="same-origin"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                ) : (
                    <MenuBookRoundedIcon sx={{ fontSize: 56 }} aria-hidden="true" />
                )}
            </Box>

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
