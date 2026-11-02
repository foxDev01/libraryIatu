import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PageSurface from '../Main/PageSurface';

export default function About() {
    return (
        <PageSurface title="О сервисе">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 720 }}>
                <Typography variant="body1">
                    Это онлайн-сервис, который можно использовать сразу в нескольких ролях.
                    Это удобная электронная библиотека для вуза.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Тут собраны все необходимые книги для обучения в вашем вузе.
                    Все книги распределены по группам, то есть у каждой группы свои книги, и книги других групп вам недоступны.
                    Также вы можете попросить добавить книгу через «Задать вопрос».
                </Typography>
            </Box>
        </PageSurface>
    );
}
