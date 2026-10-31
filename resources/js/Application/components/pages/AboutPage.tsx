import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function About() {
    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h3" component="h2" sx={{ fontSize: 26 }} gutterBottom>
                О сервисе
            </Typography>
            <Typography variant="subtitle1">
                Это онлайн-сервис, который можно использовать сразу в нескольких ролях.
                Это удобная электронная библиотека для вуза.
            </Typography>
            <Typography variant="subtitle1">
                Тут собраны все необходимые книги для обучения в вашем вузе.
                Все книги распределены по группам, то есть у каждой группы свои книги, и книги других групп вам недоступны.
                Также вы можете попросить добавить книгу через «Задать вопрос».
            </Typography>
        </Box>
    );
}
