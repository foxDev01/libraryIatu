import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
  });

export default function About() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h3" component="h2" gutterBottom>
                О сервисе
            </Typography>
            <Typography variant="subtitle1" >
                Это нлайновый сервис можно использовать сразу в нескольких ролях.
                Это удобная электронная библиотека для вуза.
            </Typography>
            <Typography variant="subtitle1" >
               Тут собраны все необходимые книги для обучения в вашем вузе. 
               Все книги распределены по группам, т.е у каждой группы свои книги и книги других групп вам не будут доступны. 
               Так же вы можете попросить, что бы вам добавили книгу через "Задать вопрос".
            </Typography>

        </div>
    );
}
