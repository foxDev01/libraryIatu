import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IIdeaProps from '../../interfaces/BooksProps';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        minWidth: 150,
        margin: 5,
    },
    title: {
        fontSize: 18,
    },
}));

export default function Book(props: IIdeaProps) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ backgroundColor: '#FFFFFF' }}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" variant="h3" align="left">
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
}
